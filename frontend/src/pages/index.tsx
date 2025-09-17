// @mui
import { styled } from '@mui/material/styles';

// layouts
import MainLayout from '../layouts/MainLayout';

// components
import Page from '../components/Page';

// sections
import {
  HomeHero,
  HomeTrustMetrics,
  HomeTrendingListings,
  HomeAuction,
  HomePopularCities,
  HomeBenefits,
  HomeFAQ,
  HomeFooter,
} from '../sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout variant="main">{page}</MainLayout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="The World's #1 Commercial Real Estate Marketplace">
      <HomeHero />
      <ContentStyle>
        <HomeTrustMetrics />
        <HomeTrendingListings />
        <HomeAuction />
        <HomePopularCities />
        <HomeBenefits />
        <HomeFAQ />
        <HomeFooter />
      </ContentStyle>
    </Page>
  );
}
