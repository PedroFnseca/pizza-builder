import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function AppTextInput({ label, placeholder, value, onChangeText, ...props }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}

const createStyles = ({ colors, spacing, radii, typography }) =>
  StyleSheet.create({
    wrapper: {
      gap: spacing.xs,
    },
    label: {
      color: colors.textSecondary,
      fontSize: typography.caption,
    },
    input: {
      backgroundColor: colors.surfaceRaised,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.textPrimary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: typography.body,
    },
  });
