import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import useMovies from '../hooks/useMovies';
import Movie from '../components/Movie';
import Colors from 'open-color';
import Screen from '../components/Screen';

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
});

const MoviesScreen = () => {
  const { movies, isLoading, loadMore, canLoadmore, refresh } = useMovies();
  return (
    <Screen headerVisible={false}>
      {isLoading ? (
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
