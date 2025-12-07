import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { queryClient, setupFocusManager } from './src/query/queryClient';
import { ThemeProvider, useAppTheme } from './src/styles/ThemeProvider';

function AppContent() {
  const { colors, colorScheme } = useAppTheme();

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: colorScheme === 'dark',
      colors: {
        ...DefaultTheme.colors,
        background: colors.background,
        card: colors.surface,
        text: colors.textPrimary,
        primary: colors.accent,
        border: colors.border,
      },
    }),
    [colors, colorScheme]
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => setupFocusManager(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
