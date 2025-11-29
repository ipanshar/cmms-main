import { MD3LightTheme as DefaultTheme, useTheme } from 'react-native-paper';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#dc2626',
    secondary: '#f87171',
    tertiary: '#9DA1A1',
    background: '#fef2f2',
    secondaryContainer: '#fee2e2',
    success: '#57CA22',
    warning: '#FFA319',
    error: '#FF1943',
    info: '#33C2FF',
    black: '#1f2937',
    white: '#ffffff',
    primaryAlt: '#b91c1c',
    primaryContainer: '#fee2e2',
    tertiaryContainer: 'black',
    grey: '#676b6b'
  }
};
export const useAppTheme = () => useTheme<typeof customTheme>();
