import { useMemo } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function AppButton({ title, onPress, variant = 'primary', fullWidth = true, disabled = false, icon }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isDisabled = disabled === true;
  const isFullWidth = fullWidth === true;
  const variantStyle = styles[variant] ?? styles.primary;
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.base, variantStyle, isFullWidth && styles.fullWidth, isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {icon}
      <Text style={[styles.label, variant === 'ghost' && styles.labelGhost]}>{title}</Text>
    </Pressable>
  );
}

const createStyles = ({ colors, spacing, radii, typography }) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.md,
    },
    fullWidth: {
      width: '100%',
    },
    primary: {
      backgroundColor: colors.accent,
    },
    secondary: {
      backgroundColor: colors.surfaceRaised,
      borderWidth: 1,
      borderColor: colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.6,
    },
    label: {
      color: colors.textPrimary,
      fontWeight: typography.weightBold,
      fontSize: typography.body,
    },
    labelGhost: {
      color: colors.textSecondary,
    },
  });
