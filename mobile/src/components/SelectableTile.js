import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../styles/ThemeProvider';

export default function SelectableTile({
  title,
  subtitle,
  helper,
  selected = false,
  onPress,
  type = 'radio',
}) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isSelected = selected === true || selected === 'true';
  const isCheckbox = type === 'checkbox';
  const indicatorStyle = isSelected ? styles.indicatorOn : styles.indicatorOff;
  const indicatorShape = isCheckbox ? styles.square : styles.circle;

  return (
    <Pressable style={[styles.tile, isSelected && styles.tileActive]} onPress={onPress}>
      <View style={[styles.indicator, indicatorShape, indicatorStyle]} />
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {helper ? <Text style={styles.helper}>{helper}</Text> : null}
      </View>
    </Pressable>
  );
}

const createStyles = ({ colors, spacing, radii, typography }) =>
  StyleSheet.create({
    tile: {
      flexDirection: 'row',
      gap: spacing.md,
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceRaised,
    },
    tileActive: {
      borderColor: colors.accent,
      backgroundColor: colors.surface,
    },
    indicator: {
      width: 22,
      height: 22,
      borderWidth: 2,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      borderRadius: 12,
    },
    square: {
      borderRadius: 6,
    },
    indicatorOn: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    indicatorOff: {
      backgroundColor: 'transparent',
    },
    texts: {
      flex: 1,
      gap: 2,
    },
    title: {
      color: colors.textPrimary,
      fontWeight: typography.weightBold,
      fontSize: typography.body,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: typography.caption,
    },
    helper: {
      color: colors.muted,
      fontSize: typography.caption,
    },
  });
