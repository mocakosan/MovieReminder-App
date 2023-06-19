import { useCallback, useMemo } from 'react';
import { Movie } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getDiscoverMovies } from '../modules/ApiRequest';
import dayjs from 'dayjs';

const useMovies = () => {
  const getUpcommingMovies = useCallback(async () => {
    const result = await getDiscoverMovies({
      releaseDateGte: dayjs().format('YYYY-MM-DD'),
      releaseDateLte: dayjs().add(1, 'years').format('YYYY-MM-DD'),
    });
    return result;
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ['upcomming-movies'],
    queryFn: getUpcommingMovies,
  });

  const movies = data?.results ?? [];
  return {
    movies,
    isLoading,
  };
};

export default useMovies;
