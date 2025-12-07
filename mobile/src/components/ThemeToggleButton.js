import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function ThemeToggleButton() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colorScheme, toggleTheme } = theme;
  const isDark = colorScheme === 'dark';
  const Icon = isDark ? Sun : Moon;
  const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={nextLabel}
      style={styles.button}
    >
      <Icon color={theme.colors.textPrimary} size={18} strokeWidth={2.25} />
    </Pressable>
  );
}

const createStyles = ({ colors, spacing, radii }) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radii.pill,
      backgroundColor: colors.surfaceRaised,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });
