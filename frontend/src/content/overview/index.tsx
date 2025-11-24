import {
  Box,
  Container,
  Grid,
  Link,
  styled,
  Typography,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Highlights from './Highlights';
import NavBar from '../../components/NavBar';
import { useEffect } from 'react';
import { isCloudVersion } from '../../config';
import { useBrand } from '../../hooks/useBrand';
import { useSelector } from '../../store';
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  Sms,
  LinkedIn
} from '@mui/icons-material';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[100]};
    color: ${theme.colors.alpha.white[70]};
    padding: ${theme.spacing(4)} 0;
`
);

const FooterLink = styled(Link)(
  ({ theme }) => `
    color: ${theme.colors.alpha.white[70]};
    text-decoration: none;

    &:hover {
      color: ${theme.colors.alpha.white[100]};
      text-decoration: underline;
    }
`
);

const SectionHeading = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.colors.alpha.white[100]};
    margin-bottom: ${theme.spacing(2)};
`
);

function Footer() {
  const navigate = useNavigate();
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <SectionHeading variant="h5">Контакты</SectionHeading>
            <Stack spacing={2}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  (window.location.href = 'mailto:admin@shin-line.com')
                }
                display="flex"
                alignItems="center"
              >
                <Mail fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  admin@shin-line.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  +7 775 123 45 67
                </Typography>
              </Box>
              {/* <Box display="flex" alignItems="center">
                <Sms fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  +7 775 123 45 67
                </Typography>
              </Box> */}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <SectionHeading variant="h5">Компания</SectionHeading>
            <Stack spacing={2}>
              <FooterLink href="/pricing">Цены</FooterLink>
              <FooterLink href="/privacy">Политика конфиденциальности</FooterLink>
              <FooterLink href="/terms-of-service">Условия обслуживания</FooterLink>
            </Stack> */}
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <SectionHeading variant="h5">Социальные сети</SectionHeading>
            <Stack direction="row" spacing={2}>
              <FooterLink href="https://www.linkedin.com/company/91710999">
                <LinkedIn />
              </FooterLink> */}
              {/*<FooterLink href="#">*/}
              {/*  <Twitter />*/}
              {/*</FooterLink>*/}
              {/*<FooterLink href="#">*/}
              {/*  <Instagram />*/}
              {/*</FooterLink>*/}
            {/* </Stack> */}
          </Grid>
          <Grid item xs={12} md={3}>
            <SectionHeading variant="h5">Мобильные приложения</SectionHeading>
            <Stack spacing={1} direction="row">
              <img
                style={{ cursor: 'pointer' }}
                onClick={() =>
                (window.location.href =
                  'https://play.google.com/store/apps/details?id=com.atlas.cmms')
                }
                width={'150px'}
                src={'/static/images/overview/playstore-badge.png'}
              />
              <img
                style={{ cursor: 'pointer' }}
                onClick={() =>
                (window.location.href =
                  'https://apps.apple.com/us/app/atlas-cmms/id6751547284')
                }
                width={'150px'}
                src={'/static/images/overview/app_store_badge.svg.webp'}
              />
            </Stack>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Shin-Line. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}

function Overview() {
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const { isLicenseValid } = useSelector((state) => state.license);
  const brandConfig = useBrand();

  useEffect(() => {
    if (
      !isCloudVersion ||
      (isCloudVersion && isLicenseValid != null && !isLicenseValid)
    )
      console.log('license is invalid');
    // navigate('/account/login');
  }, [isCloudVersion, isLicenseValid]);

  return (
    <OverviewWrapper>
      <Helmet>
        <title>{brandConfig.name}</title>
      </Helmet>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          transition: 'opacity 750ms',
          flexGrow: { lg: 1 },
          minHeight: '80vh'
        }}
      >
        <Box
          sx={{
            bgcolor: '#dc2626',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '8px',
            p: { xs: 6, lg: 8, xl: 8 },
            maxHeight: '500px',
            maxWidth: { xs: '335px', lg: '1200px', xl: '1400px' },
            width: '100%'
          }}
        >
          <Box
            component="img"
            src="/static/images/logo/shin-line-logo.png"
            alt="Shin-Line Logo"
            sx={{
              width: '320px',
              height: 'auto',
              mb: 6
            }}
          />
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: '2.25rem',
              fontFamily: 'serif'
            }}
          >
            Shin-Line ТОиР
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontSize: '1rem',
              fontFamily: 'serif'
            }}
          >
            Система управления техническим обслуживанием
          </Typography>
        </Box>
      </Box>
      <Footer />
    </OverviewWrapper>
  );
}

export default Overview;
