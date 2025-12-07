import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import OrdersScreen from '../screens/OrdersScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import { colors } from '../styles/theme';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pizza Builder' }} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} options={{ title: 'New Order' }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Past Orders' }} />
      <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} options={{ title: 'Pizza Details' }} />
    </Stack.Navigator>
  );
}
