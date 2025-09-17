// Core packages
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Local modules
import connectDB from './src/config/connect.db.js';
import errorHandler from './src/middleware/error.middleware.js';
import authRoutes from './src/modules/Auth/routes/auth.routes.js';
import agentRoutes from './src/modules/Agent/Property/routes/agent.routes.js';
import accountRoutes from './src/modules/Agent/Account/routes/account.routes.js';
import userRoutes from './src/modules/User/Property/routes/user.routes.js';
import userAccountRoutes from './src/modules/User/Account/routes/account.routes.js';
import validateSecurity from './src/utils/security.validation.js';
const app = express();

/* ==========================
   Database Connection
========================== */
connectDB(); // Connect to MongoDB

/* ==========================
   Global Middlewares
========================== */

// Enable CORS for all routes
app.use(cors());

// Set security-related HTTP headers
app.use(helmet());

// Apply rate limiting to all requests
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per window
//     standardHeaders: true,
//     legacyHeaders: false,
//   })
// );

// Compress response bodies
app.use(compression());

// Parse incoming JSON request bodies
app.use(express.json({ limit: '50mb' })); // for JSON payloads

// Validate security
app.use(validateSecurity);

// Parse incoming URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: '500mb' })); // for form data

/* ==========================
   Routes
========================== */

// Authentication routes
app.use('/api/auth', authRoutes);

// Agent routes
app.use('/api/agent', agentRoutes);

// Agent account routes
app.use('/api/agent', accountRoutes);

// User routes
app.use('/api/user', userRoutes);

// User account routes
app.use('/api/user', userAccountRoutes);


/* ==========================
   Error Handling Middleware
========================== */

// Handles errors thrown from controllers or middleware
app.use(errorHandler);

/* ==========================
   Export App
========================== */
export default app;
