// securityMiddleware.js
function toStringSafe(value) {
    // Convert any primitive / object to a stable string for inspection
    try {
      if (typeof value === 'string') return value;
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    } catch (e) {
      return String(value);
    }
  }
  
  function isMaliciousString(s) {
    if (!s || typeof s !== 'string') return false;
    const str = s.trim();
  
    // Common injection / malicious patterns (broad coverage)
    const patterns = [
      // HTML / XSS
      /<\s*script\b/i,
      /<\/?\s*\w+[^>]*>/,                 // any HTML tag
      /\bon\w+\s*=/i,                     // onerror=, onclick= handlers
      /javascript:\s*/i,                  // javascript: urls
  
      // JS code injection / eval / constructors
      /\b(eval|Function|new Function|setTimeout|setInterval|import\(|require\()\b/i,
      /\b(document|window|location|globalThis)\b/i,
      /=>/,                               // arrow functions
      /\bfunction\s*\(/i,
  
      // SQL injection patterns
      /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bTRUNCATE\b|\bALTER\b|\bCREATE\b|\bREPLACE\b|\bMERGE\b|\bGRANT\b|\bREVOKE\b)/i,
      /(\bUNION\b.*\bSELECT\b)/i,
      /(--\s|\b#\b|\/\*)/,                 // SQL comments: --, #, /*
      /(['"`])\s*or\s+1\s*=\s*1/i,         // tautology ' OR 1=1
      /\bWHERE\b.*=.*\bOR\b.*=/i,
  
      // NoSQL / MongoDB injection
      /"\s*\$where\s*":/i,
      /\$\s*(where|ne|gt|lt|gte|lte|regex|in|nin|or|and)\b/i,
      /ObjectId\(/i,
  
      // LDAP, XPath patterns
      /\b(&(uid|cn)=|\(|\)\s*=\s*)/i,      // crude LDAP/XPath-ish hints
  
      // Command injection / shell
      /(;|\|\||&&|`|\$\(.*\)|\>\s*\/|<\s*\/|>\s*|<\s*)/, // ; && || ` $( ) > < pipes/redirects
      /\b(nc|netcat|bash|sh|powershell|cmd\.exe)\b/i,
  
      // CRLF / header injection
      /\r\n|\n\r|\r|\n.*(Host:|GET|POST|HTTP\/|Content-Type:)/i,
  
      // Template injection / server-side template languages
      /\{\{\s*.*\s*\}\}/,                  // {{ ... }}
      /<%.*%>/,                            // e.g. EJS / ERB style
      /\$\{\s*.*\s*\}/,                    // ${...} in templates
  
      // Encoded payloads (data URIs / base64 with script)
      /data:\s*text\/html|data:\s*image\/svg\+xml/i,
      /base64,[A-Za-z0-9+/=]{20,}/i,
  
      // Generic suspicious characters often used in injections
      /[\x00-\x08\x0B\x0C\x0E-\x1F]/,     // control chars
    ];
  
    return patterns.some((re) => re.test(str));
  }
  
  function traverseAndCheck(obj, path = '') {
    // returns { ok: true } or { ok: false, path, value }
    if (obj === null || obj === undefined) return { ok: true };
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'bigint') {
      const str = toStringSafe(obj);
      if (isMaliciousString(str)) return { ok: false, path, value: str };
      return { ok: true };
    }
  
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const res = traverseAndCheck(obj[i], `${path}[${i}]`);
        if (!res.ok) return res;
      }
      return { ok: true };
    }
  
    if (typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        const nextPath = path ? `${path}.${key}` : key;
        const res = traverseAndCheck(obj[key], nextPath);
        if (!res.ok) return res;
      }
      return { ok: true };
    }
  
    // fallback for functions/symbols/etc.
    const str = toStringSafe(obj);
    if (isMaliciousString(str)) return { ok: false, path, value: str };
    return { ok: true };
  }
  
  /**
   * Express middleware: checks req.body, req.query, req.params for injections.
   * If malicious input is found -> 400 with offending path.
   */
  export default function validateSecurity(req, res, next) {
    try {
      const sources = { body: req.body, query: req.query, params: req.params };
  
      for (const [sourceName, sourceObj] of Object.entries(sources)) {
        if (!sourceObj) continue;
        const result = traverseAndCheck(sourceObj, sourceName);
        if (!result.ok) {
          return res.status(400).json({
            success: false,
            message: `Malicious or injection-like content detected in "${result.path}"`,
          });
        }
      }
  
      // All clear
      return next();
    } catch (err) {
      // Fail-safe: if the middleware itself errors, block the request
      return res.status(400).json({
        success: false,
        message: 'Invalid input detected',
      });
    }
  }
  