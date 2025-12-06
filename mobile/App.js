import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
        <View className="w-11/12 max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
          <Text className="text-2xl font-semibold text-white">Pizza Builder</Text>
          <Text className="mt-2 text-base text-zinc-200">
            Tailwind (NativeWind) ja esta configurado. Edite este componente e
            use classes utilitarias com `className`. teste
          </Text>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
