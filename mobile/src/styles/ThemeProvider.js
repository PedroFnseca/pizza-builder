import { Appearance } from 'react-native';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { darkColors, lightColors, radii, spacing, typography } from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemPreference = Appearance.getColorScheme();
  const [colorScheme, setColorScheme] = useState(systemPreference === 'light' ? 'light' : 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: nextScheme }) => {
      if (nextScheme) setColorScheme(nextScheme);
    });
    return () => subscription?.remove();
  }, []);

  const toggleTheme = useCallback(
    () => setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  const colors = colorScheme === 'light' ? lightColors : darkColors;

  const theme = useMemo(
    () => ({
      colors,
      spacing,
      radii,
      typography,
    }),
    [colors]
  );

  const value = useMemo(
    () => ({
      ...theme,
      colorScheme,
      toggleTheme,
    }),
    [theme, colorScheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}
