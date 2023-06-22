import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import MoviesScreen from './src/screens/MoviesScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieScreen from './src/screens/MovieScreen';
import RemindersScreen from './src/screens/RemindersScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import useCodePush from './src/hooks/useCodePush';
import CodePush from 'react-native-code-push';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const { updating, progress } = useCodePush();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {updating ? (
            <Stack.Screen name="Loading">
              {props => (
                <LoadingScreen
                  {...props}
                  progress={
                    progress != null
                      ? {
                          total: progress.totalBytes,
                          now: progress.receivedBytes,
                        }
                      : undefined
                  }
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Movies" component={MoviesScreen} />
              <Stack.Screen name="Movie" component={MovieScreen} />
              <Stack.Screen name="Reminders" component={RemindersScreen} />
              {/* <Stack.Screen name="Purchase" component={PurchaseScreen} /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
export default CodePush(codePushOptions)(App);
