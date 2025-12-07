import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import LoadingOverlay from '../components/LoadingOverlay';
import SectionHeader from '../components/SectionHeader';
import SelectableTile from '../components/SelectableTile';
import { IngredientsService, PizzasService, SizesService } from '../../service';
import { colors, spacing } from '../styles/theme';

const formatMoney = (value) => `$${Number(value ?? 0).toFixed(2)}`;

export default function NewOrderScreen({ navigation }) {
  const [sizes, setSizes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setError('');
        const [sizesData, ingredientsData] = await Promise.all([
          SizesService.list(),
          IngredientsService.list(),
        ]);
        setSizes(sizesData ?? []);
        setIngredients(ingredientsData ?? []);
      } catch (err) {
        setError(err.message || 'Failed to load options');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const toggleIngredient = (id) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formValid = useMemo(() => {
    return customerName.trim() && sizeId && selectedIngredients.length > 0;
  }, [customerName, sizeId, selectedIngredients]);

  const totalPrice = useMemo(() => {
    const sizePrice = sizes.find((size) => size.id === sizeId)?.basePrice ?? 0;
    const ingredientsTotal = selectedIngredients.reduce((sum, id) => {
      const ingredient = ingredients.find((item) => item.id === id);
      return sum + (ingredient?.extraPrice ?? 0);
    }, 0);

    return sizePrice + ingredientsTotal;
  }, [ingredients, selectedIngredients, sizeId, sizes]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError('');
      const created = await PizzasService.create({
        customerName,
        sizeId,
        ingredientIds: selectedIngredients,
      });
      console.log('Created pizza order:', created);
      if (created?.id) {
        navigation.replace('PizzaDetails', { id: created.id, initialPizza: created });
      }
    } catch (err) {
      setError(err.message || 'Could not create pizza');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading || submitting} message="Loading…" />
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader title="Customer" />
        <Card>
          <AppTextInput
            label="Customer name"
            placeholder="Type the customer's name"
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
          />
        </Card>

        <SectionHeader title="Size" />
        <Card style={styles.listCard}>
          {sizes.map((size) => (
            <SelectableTile
              key={size.id}
              title={size.name}
              subtitle={formatMoney(size.basePrice)}
              helper="Only one size can be selected"
              selected={size.id === sizeId}
              onPress={() => setSizeId(size.id)}
              type="radio"
            />
          ))}
        </Card>

        <SectionHeader title="Ingredients" />
        <Card style={styles.listCard}>
          {ingredients.map((ingredient) => (
            <SelectableTile
              key={ingredient.id}
              title={ingredient.name}
              subtitle={`+ ${formatMoney(ingredient.extraPrice)}`}
              selected={selectedIngredients.includes(ingredient.id)}
              onPress={() => toggleIngredient(ingredient.id)}
              type="checkbox"
            />
          ))}
        </Card>

        <SectionHeader title="Total" />
        <Card>
          <InfoRow label="Total" value={formatMoney(totalPrice)} />
        </Card>

        <ErrorMessage message={error} />

        <AppButton
          title="Create pizza"
          onPress={handleSubmit}
          disabled={!formValid || submitting || loading}
        />

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  listCard: {
    gap: spacing.sm,
  },
});
