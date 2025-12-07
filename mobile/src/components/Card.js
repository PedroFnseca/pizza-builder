import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function Card({ children, style }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={[styles.card, style]}>{children}</View>;
}

const createStyles = ({ colors, spacing, radii }) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
    },
  });
