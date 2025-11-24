import {
  apiUrl,
  BrandRawConfig,
  brandRawConfig,
  customLogoPaths
} from '../config';
import { useSelector } from '../store';

const DEFAULT_WHITE_LOGO = '/static/images/logo/logo-white.png';
const DEFAULT_DARK_LOGO = '/static/images/logo/logo.png';
const CUSTOM_DARK_LOGO = `${apiUrl}images/custom-logo.png`;
const CUSTOM_WHITE_LOGO = `${apiUrl}images/custom-logo-white.png`;

interface BrandConfig extends BrandRawConfig {
  logo: { white: string; dark: string };
}
export function useBrand(): BrandConfig {
  const defaultBrand: Omit<BrandConfig, 'logo'> = {
    name: 'Shin-Line ТОиР',
    shortName: 'Shin-Line ТОиР',
    website: 'https://corp.shin-line.com:8081',
    mail: 'admin@shin-line.com',
    phone: '+7 775 123 45 67',
    addressStreet: 'улица Султана Бейбарыса, 58',
    addressCity: 'Республика Казахстан, Алматинская область, Илийский район, с. Байсерке'
  };
  const { isLicenseValid } = useSelector((state) => state.license);
  return {
    logo: {
      white: customLogoPaths
        ? isLicenseValid == null
          ? null
          : isLicenseValid
          ? CUSTOM_WHITE_LOGO
          : DEFAULT_WHITE_LOGO
        : DEFAULT_WHITE_LOGO,
      dark: customLogoPaths
        ? isLicenseValid == null
          ? null
          : isLicenseValid
          ? CUSTOM_DARK_LOGO
          : DEFAULT_DARK_LOGO
        : DEFAULT_DARK_LOGO
    },
    ...(isLicenseValid && brandRawConfig ? brandRawConfig : defaultBrand)
  };
}
