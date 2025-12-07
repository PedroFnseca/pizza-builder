import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function InfoRow({ label, value }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const createStyles = ({ colors, spacing, typography }) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.sm,
    },
    label: {
      color: colors.textSecondary,
      fontSize: typography.caption,
      flexShrink: 0,
      marginRight: spacing.sm,
    },
    value: {
      color: colors.textPrimary,
      fontWeight: typography.weightBold,
      fontSize: typography.body,
      flex: 1,
      flexWrap: 'wrap',
      textAlign: 'right',
    },
  });
