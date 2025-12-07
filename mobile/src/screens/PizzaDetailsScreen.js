import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePizzaQuery } from '../query/hooks';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import InfoRow from '../components/InfoRow';
import { colors, spacing, typography } from '../styles/theme';

const formatMoney = (value) => `$${Number(value ?? 0).toFixed(2)}`;
const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default function PizzaDetailsScreen({ route }) {
  const { id, initialPizza } = route.params || {};
  const [notFound, setNotFound] = useState(false);

  useEffect(() => setNotFound(false), [id]);

  const {
    data: pizza,
    isLoading,
    isFetching,
    error,
  } = usePizzaQuery(id, {
    initialData: initialPizza,
    refetchOnMount: true,
    onError: (err) => {
      if (err?.status === 404) setNotFound(true);
    },
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
        <Text style={styles.meta}>Loading pizza…</Text>
      </View>
    );
  }

  if (notFound) {
    return <EmptyState message="Pizza not found" />;
  }

  if (error && !notFound) {
    return <EmptyState message={error.message || 'Failed to load pizza'} />;
  }

  if (!pizza) {
    return <EmptyState message="No data available" />;
  }

  const ingredientNames = Array.isArray(pizza.ingredients)
    ? pizza.ingredients.map((i) => i.name || i).join(', ')
    : Array.isArray(pizza.ingredientIds)
      ? pizza.ingredientIds.join(', ')
      : '—';
  const totalPrice = Number(pizza.finalPrice ?? 0);
  const sizeLabel = pizza.size?.name || pizza.sizeId || '—';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{pizza.customerName}</Text>
        <InfoRow label="Order ID" value={pizza.id} />
        <InfoRow label="Customer" value={pizza.customerName || '—'} />
        <InfoRow label="Size" value={sizeLabel} />
        <InfoRow label="Ingredients" value={ingredientNames} />
        <InfoRow label="Total" value={formatMoney(totalPrice)} />
        <InfoRow label="Created at" value={formatDateTime(pizza.createdAt)} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  card: {
    gap: spacing.sm,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
  },
  meta: {
    color: colors.textSecondary,
  },
});
