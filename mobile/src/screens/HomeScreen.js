import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useAppTheme } from '../styles/ThemeProvider';

export default function HomeScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Craft pizzas fast, track every order</Text>
        <Text style={styles.subtitle}>
          Start a brand new pizza or review the orders you already placed.
        </Text>
        <View style={styles.actions}>
          <AppButton title="New order" onPress={() => navigation.navigate('NewOrder')} />
          <AppButton
            variant="secondary"
            title="See previous orders"
            onPress={() => navigation.navigate('Orders')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = ({ colors, spacing, typography }) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      padding: spacing.xl,
      gap: spacing.xl,
    },
    hero: {
      gap: spacing.md,
    },
    eyebrow: {
      color: colors.accent,
      fontSize: typography.caption,
      letterSpacing: 1,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 30,
      fontWeight: typography.weightBold,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: typography.body,
      lineHeight: 22,
    },
    actions: {
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    cardTitle: {
      color: colors.textPrimary,
      fontWeight: typography.weightBold,
      fontSize: typography.subtitle,
      marginBottom: spacing.sm,
    },
    cardBody: {
      color: colors.textSecondary,
      fontSize: typography.body,
      marginBottom: spacing.xs,
    },
  });
