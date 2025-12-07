import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../styles/theme';

export default function SectionHeader({ title, action }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
  },
});
