import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import MoviesScreen from './src/screens/MoviesScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieScreen from './src/screens/MovieScreen';
import RemindersScreen from './src/screens/RemindersScreen';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Movies" component={MoviesScreen} />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Reminders" component={RemindersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
