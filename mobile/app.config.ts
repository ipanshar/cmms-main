import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

const apiUrl = process.env.API_URL;
const googleServicesJson = process.env.GOOGLE_SERVICES_JSON;

export default ({ config }: ConfigContext): { expo: ExpoConfig } => ({
  expo: {
    ...config,
  name: 'Shin-Line ТОиР',
    slug: 'shinline',
    version: '1.0.31',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'atlascmms',
    userInterfaceStyle: 'automatic',
    notification: {
      icon: './assets/images/notification.png'
    },
    sdkVersion: '47.0.0',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/803b5007-0c60-4030-ac3a-c7630b223b92'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      runtimeVersion: {
        policy: 'sdkVersion'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      versionCode: 31,
      package: 'com.atlas.cmms',
      googleServicesFile: googleServicesJson ?? './google-services.json',
      runtimeVersion: '1.0.0'
    },
    web: {
      favicon: './assets/images/favicon.png'
    },
    extra: {
      API_URL: apiUrl,
      eas: {
        projectId: 'cd4a7c56-4a5b-4c6f-8e38-5b5eafcbab3e'
      }
    },
    plugins: [
      'react-native-nfc-manager',
      [
        'expo-barcode-scanner',
        {
          cameraPermission: 'Allow Shin-Line ТОиР to access camera.'
        }
      ]
    ]
  }
});
