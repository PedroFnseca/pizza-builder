import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, radii, typography } from '../styles/theme';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
