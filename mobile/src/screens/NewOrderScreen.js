import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import LoadingOverlay from '../components/LoadingOverlay';
import SectionHeader from '../components/SectionHeader';
import SelectableTile from '../components/SelectableTile';
import {
  useCreatePizzaMutation,
  useIngredientsQuery,
  useSizesQuery,
} from '../query/hooks';
import { useAppTheme } from '../styles/ThemeProvider';

const formatMoney = (value) => `$${Number(value ?? 0).toFixed(2)}`;

export default function NewOrderScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [customerName, setCustomerName] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState('');

  const {
    data: sizesData = [],
    isLoading: sizesLoading,
    error: sizesError,
    refetch: refetchSizes,
  } = useSizesQuery();

  const {
    data: ingredientsData = [],
    isLoading: ingredientsLoading,
    error: ingredientsError,
    refetch: refetchIngredients,
  } = useIngredientsQuery();

  const { mutateAsync: createPizza, isPending: submitting, error: createError } =
    useCreatePizzaMutation();

  const sizes = sizesData ?? [];
  const ingredients = ingredientsData ?? [];
  const loading = sizesLoading || ingredientsLoading;
  const errorMessage = error || createError?.message || sizesError?.message || ingredientsError?.message;

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
      setError('');
      const created = await createPizza({
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

        <ErrorMessage message={errorMessage} />

        {errorMessage ? (
          <AppButton
            title="Retry loading options"
            onPress={() => {
              refetchSizes();
              refetchIngredients();
            }}
            disabled={loading}
            variant="secondary"
          />
        ) : null}

        <AppButton
          title="Create pizza"
          onPress={handleSubmit}
          disabled={!formValid || submitting || loading}
        />

      </ScrollView>
    </>
  );
}

const createStyles = ({ colors, spacing }) =>
  StyleSheet.create({
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
