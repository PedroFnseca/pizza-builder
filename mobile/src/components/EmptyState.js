import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function EmptyState({ message }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const createStyles = ({ colors, spacing, typography }) =>
  StyleSheet.create({
    container: {
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: colors.surface,
    },
    text: {
      color: colors.textSecondary,
      fontSize: typography.body,
    },
  });
