import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../styles/theme';

export default function AppButton({ title, onPress, variant = 'primary', fullWidth = true, disabled = false, icon }) {
  const isDisabled = disabled === true || disabled === 'true';
  const isFullWidth = fullWidth === true || fullWidth === 'true';
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

const styles = StyleSheet.create({
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
