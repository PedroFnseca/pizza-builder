import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function ErrorMessage({ message }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const createStyles = ({ colors, spacing, radii, typography }) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: colors.danger,
      borderWidth: 1,
      borderRadius: radii.md,
      padding: spacing.md,
    },
    text: {
      color: colors.danger,
      fontSize: typography.body,
    },
  });
