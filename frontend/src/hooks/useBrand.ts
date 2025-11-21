import {
  apiUrl,
  BrandRawConfig,
  brandRawConfig,
  customLogoPaths
} from '../config';
import { useSelector } from '../store';

const DEFAULT_WHITE_LOGO = '/static/images/logo/logo.jpg';
const DEFAULT_DARK_LOGO = '/static/images/logo/logo.jpg';
const CUSTOM_DARK_LOGO = `${apiUrl}images/custom-logo.jpg`;
const CUSTOM_WHITE_LOGO = `${apiUrl}images/custom-logo.jpg`;

interface BrandConfig extends BrandRawConfig {
  logo: { white: string; dark: string };
}
export function useBrand(): BrandConfig {
  const defaultBrand: Omit<BrandConfig, 'logo'> = {
    name: 'Шинлайн',
    shortName: 'Шинлайн',
    website: 'https://www.cmms.local',
    mail: 'contact@cmms.local',
    phone: '+7 000 000 00 00',
    addressStreet: 'Шинлайн Street',
    addressCity: 'Шинлайн City'
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
