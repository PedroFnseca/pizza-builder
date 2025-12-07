import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import SectionHeader from '../components/SectionHeader';
import { PizzasService } from '../../service';
import { colors, spacing, typography } from '../styles/theme';

const formatMoney = (value) => `$${Number(value ?? 0).toFixed(2)}`;
const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return date.toLocaleDateString();
};

export default function OrdersScreen({ navigation }) {
  const [pizzas, setPizzas] = useState([]);
  const [customerFilter, setCustomerFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await PizzasService.list({
        customerName: customerFilter.trim() || undefined,
        sortBy,
        order,
      });
      setPizzas(data ?? []);
    } catch (err) {
      setError(err.message || 'Failed to fetch pizzas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, [sortBy, order]);

  useEffect(() => {
    const timer = setTimeout(() => fetchPizzas(), 400);
    return () => clearTimeout(timer);
  }, [customerFilter]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Filters" />
      <Card style={styles.filterCard}>
        <AppTextInput
          label="Customer name"
          placeholder="Search by customer"
          value={customerFilter}
          onChangeText={(text) => setCustomerFilter(text)}
        />
        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort by</Text>
          <View style={styles.sortActions}>
            <AppButton
              title="Price"
              variant={sortBy === 'finalPrice' ? 'primary' : 'secondary'}
              onPress={() => setSortBy('finalPrice')}
              fullWidth={false}
            />
            <AppButton
              title="Date"
              variant={sortBy === 'createdAt' ? 'primary' : 'secondary'}
              onPress={() => setSortBy('createdAt')}
              fullWidth={false}
            />
            <AppButton
              title={order === 'desc' ? 'Desc' : 'Asc'}
              variant="ghost"
              onPress={() => setOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
              fullWidth={false}
            />
          </View>
        </View>
        <AppButton title="Refresh" onPress={fetchPizzas} />
      </Card>

      <SectionHeader title="Orders" />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.loadingText}>Loading pizzas…</Text>
        </View>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : pizzas.length === 0 ? (
        <EmptyState message="No pizzas found" />
      ) : (
        pizzas.map((pizza) => (
          <Pressable key={pizza.id} onPress={() => navigation.navigate('PizzaDetails', { id: pizza.id })}>
            <Card style={styles.pizzaCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.customer}>{pizza.customerName}</Text>
                <Text style={styles.price}>{formatMoney(pizza.finalPrice)}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.meta}>#{pizza.id}</Text>
                <Text style={styles.meta}>Created: {formatDate(pizza.createdAt)}</Text>
              </View>
            </Card>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  filterCard: {
    gap: spacing.md,
  },
  sortRow: {
    gap: spacing.sm,
  },
  sortLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  sortActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    color: colors.textSecondary,
  },
  pizzaCard: {
    gap: spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customer: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
  },
  price: {
    color: colors.accent,
    fontWeight: typography.weightBold,
    fontSize: typography.subtitle,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
});
