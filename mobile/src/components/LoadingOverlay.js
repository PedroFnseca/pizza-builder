import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, radii, typography } from '../styles/theme';

export default function LoadingOverlay({ visible, message = 'Loading…' }) {
  const isVisible = visible === true || visible === 'true';
  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  message: {
    color: colors.textPrimary,
    fontSize: typography.body,
  },
});
