import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
