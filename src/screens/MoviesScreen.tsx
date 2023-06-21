import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useMovies from '../hooks/useMovies';
import Movie from '../components/Movie';
import Colors from 'open-color';
import Screen from '../components/Screen';
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { version } from '../../package.json';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  movieList: {
    padding: 20,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmButton: {},
  alarmIcon: {
    fontSize: 24,
    color: Colors.white,
  },
  headerLeftComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    color: Colors.white,
  },
});

const MoviesScreen = () => {
  const { movies, isLoading, loadMore, canLoadmore, refresh } = useMovies();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [adsInitiallized, setAdsInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      await mobileAds().initialize();
      setAdsInitialized(true);
    })();
  }, []);
  const renderRightComponent = useCallback(() => {
    return (
      <View style={styles.headerRightComponent}>
        <TouchableOpacity
          style={styles.alarmButton}
          onPress={() => {
            navigate('Reminders');
          }}>
          <Icon name="notifications" style={styles.alarmIcon} />
        </TouchableOpacity>
      </View>
    );
  }, [navigate]);

  const renderLeftComponent = useCallback(() => {
    return (
      <View style={styles.headerLeftComponent}>
        <Text style={styles.versionText}>{`v${version}`}</Text>
      </View>
    );
  }, []);
  return (
    <Screen
      renderLeftComponent={renderLeftComponent}
      renderRightComponent={renderRightComponent}>
      {isLoading || !adsInitiallized ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.movieList}
          data={movies}
          renderItem={({ item: movie }) => (
            <Movie
              id={movie.id}
              title={movie.title}
              originalTitle={movie.originalTitle}
              releaseDate={movie.releaseDate}
              overview={movie.overview}
              posterUrl={movie.posterUrl ?? undefined}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          onEndReached={() => {
            if (canLoadmore) {
              loadMore();
            }
          }}
          refreshControl={
            <RefreshControl
              tintColor={Colors.white}
              refreshing={isLoading}
              onRefresh={refresh}
            />
          }
        />
      )}
    </Screen>
  );
};
export default MoviesScreen;
