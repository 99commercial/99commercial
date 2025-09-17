import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';

// ----------------------------------------------------------------------

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const FAQSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: '#f8f9fa',
  position: 'relative',
  overflow: 'hidden',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#1a1a1a',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    backgroundColor: '#333',
    borderRadius: '2px',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: '#666',
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  marginBottom: theme.spacing(6),
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  backgroundColor: 'white',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    borderColor: '#333',
  },
  '& .MuiAccordionSummary-root': {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2, 3),
    '&.Mui-expanded': {
      minHeight: 'auto',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(3, 3, 4),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#333',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#333',
  marginRight: theme.spacing(2),
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#1a1a1a',
    transform: 'scale(1.05)',
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(6),
  flexWrap: 'wrap',
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: '#333',
  '& .number': {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
    display: 'block',
    lineHeight: 1,
  },
  '& .label': {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: theme.spacing(0.5),
  },
}));

const faqs = [
  {
    question: 'Is LoopNet Available for International Property Searches?',
    answer: 'Yes, LoopNet operates globally with dedicated platforms in the UK, Canada, France, and Spain. Our international presence allows you to search for commercial real estate properties across multiple countries, with localized content and currency options.',
    icon: <BusinessIcon />,
    category: 'Global Reach',
  },
  {
    question: 'Office Space or Coworking: Which Fits Your Business Needs?',
    answer: 'The choice between traditional office space and coworking depends on your business size, growth plans, and operational needs. Traditional offices offer privacy and customization, while coworking spaces provide flexibility and networking opportunities.',
    icon: <TrendingUpIcon />,
    category: 'Business Solutions',
  },
  {
    question: 'What Should I Know Before Investing in Multifamily Properties?',
    answer: 'Multifamily property investment requires understanding market dynamics, property management, financing options, and local regulations. Key factors include location analysis, cash flow projections, and tenant management strategies.',
    icon: <QuestionAnswerIcon />,
    category: 'Investment',
  },
  {
    question: 'How Do I Evaluate Commercial Property Investment Returns?',
    answer: 'Commercial property returns are evaluated through metrics like cap rates, cash-on-cash returns, and internal rate of return (IRR). Consider factors like location, tenant quality, lease terms, and market conditions for comprehensive analysis.',
    icon: <TrendingUpIcon />,
    category: 'Investment',
  },
  {
    question: 'What Are the Key Factors in Commercial Real Estate Due Diligence?',
    answer: 'Due diligence includes property inspection, financial analysis, market research, legal review, environmental assessment, and tenant evaluation. This comprehensive process helps identify potential risks and opportunities before investment.',
    icon: <BusinessIcon />,
    category: 'Due Diligence',
  },
  {
    question: 'How Can I Find the Right Commercial Real Estate Agent?',
    answer: 'Look for agents with local market expertise, proven track record, strong network, and specialization in your property type. Check credentials, references, and ensure they understand your specific investment goals and timeline.',
    icon: <QuestionAnswerIcon />,
    category: 'Professional Services',
  },
];

export default function HomeFAQ() {
  const [expanded, setExpanded] = useState<string | false>('panel0');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FAQSection>
      <ContentWrapper>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <SectionTitle
                variant={isMobile ? "h3" : "h2"}
                sx={{
                  fontWeight: 800,
                  fontSize: isMobile ? '2rem' : '3rem',
                  lineHeight: 1.2,
                  marginBottom: theme.spacing(2),
                }}
              >
                Frequently Asked Questions
              </SectionTitle>
              
              <Subtitle
                variant={isMobile ? "body1" : "h6"}
                sx={{
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  lineHeight: 1.6,
                }}
              >
                Get answers to the most common questions about commercial real estate investment and business solutions
              </Subtitle>

              <StatsContainer>
                <StatItem>
                  <span className="number">500K+</span>
                  <span className="label">Properties Listed</span>
                </StatItem>
                <StatItem>
                  <span className="number">50+</span>
                  <span className="label">Countries</span>
                </StatItem>
                <StatItem>
                  <span className="number">1M+</span>
                  <span className="label">Active Users</span>
                </StatItem>
              </StatsContainer>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: { xs: '100%', lg: '83.333%' } }}>
                  <Box>
                    {faqs.map((faq, index) => (
                      <Fade in timeout={800 + index * 200} key={index}>
                        <Box>
                          <CustomAccordion
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              sx={{
                                '& .MuiAccordionSummary-content': {
                                  margin: '16px 0',
                                  alignItems: 'center',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <IconWrapper>
                                  {faq.icon}
                                </IconWrapper>
                                <Box sx={{ flex: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <Chip
                                      label={faq.category}
                                      size="small"
                                      sx={{
                                        backgroundColor: '#333',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        '&:hover': {
                                          backgroundColor: '#1a1a1a',
                                        },
                                      }}
                                    />
                                  </Box>
                                  <Typography
                                    variant={isMobile ? "subtitle1" : "h6"}
                                    sx={{
                                      fontWeight: 600,
                                      color: '#1a1a1a',
                                      fontSize: isMobile ? '1rem' : '1.1rem',
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {faq.question}
                                  </Typography>
                                </Box>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: '#555',
                                  lineHeight: 1.7,
                                  fontSize: isMobile ? '0.95rem' : '1rem',
                                }}
                              >
                                {faq.answer}
                              </Typography>
                            </AccordionDetails>
                          </CustomAccordion>
                        </Box>
                      </Fade>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      </ContentWrapper>
    </FAQSection>
  );
}
