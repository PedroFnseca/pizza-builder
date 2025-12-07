import { useMemo } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function LoadingOverlay({ visible, message = 'Loading…' }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isVisible = visible === true || visible === 'true';
  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = ({ colors, spacing, radii, typography }) =>
  StyleSheet.create({
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
