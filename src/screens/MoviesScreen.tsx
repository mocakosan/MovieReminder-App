import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import useMovies from '../hooks/useMovies';
import Movie from '../components/Movie';

const styles = StyleSheet.create({});

const MoviesScreen = () => {
  const { movies } = useMovies();
  return (
    <SafeAreaView>
      <FlatList
        style={styles.movieList}
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
      />
    </SafeAreaView>
  );
};
export default MoviesScreen;
