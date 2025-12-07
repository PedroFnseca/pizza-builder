import { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThemeToggleButton from '../components/ThemeToggleButton';
import HomeScreen from '../screens/HomeScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import OrdersScreen from '../screens/OrdersScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import { useAppTheme } from '../styles/ThemeProvider';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const theme = useAppTheme();

  const screenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.textPrimary,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: theme.colors.background },
      headerRight: () => <ThemeToggleButton />,
    }),
    [theme]
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pizza Builder' }} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} options={{ title: 'New Order' }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Past Orders' }} />
      <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} options={{ title: 'Pizza Details' }} />
    </Stack.Navigator>
  );
}
