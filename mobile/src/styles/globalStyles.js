import { StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from './theme';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '92%',
    maxWidth: 480,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.title,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
  },
  body: {
    marginTop: spacing.sm,
    fontSize: typography.body,
    fontWeight: typography.weightRegular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
