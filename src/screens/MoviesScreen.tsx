import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import useMovies from '../hooks/useMovies';
import Movie from '../components/Movie';
import Colors from 'open-color';

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
});

const MoviesScreen = () => {
  const { movies } = useMovies();
  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}

      <FlatList
        contentContainerStyle={styles.movieList}
        data={movies}
        renderItem={({ item: movie }) => (
          <Movie
            title={movie.title}
            originalTitle={movie.originalTitle}
            releaseDate={movie.releaseDate}
            overview={movie.overview}
            posterUrl={movie.posterUrl ?? undefined}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </SafeAreaView>
  );
};
export default MoviesScreen;
