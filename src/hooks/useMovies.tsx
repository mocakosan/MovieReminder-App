import { useCallback, useMemo } from 'react';
import { Movie } from '../types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDiscoverMovies } from '../modules/ApiRequest';
import dayjs from 'dayjs';

const useMovies = () => {
  const getUpcommingMovies = useCallback(async ({ pageParam = 1 }) => {
    const result = await getDiscoverMovies({
      releaseDateGte: dayjs().format('YYYY-MM-DD'),
      releaseDateLte: dayjs().add(1, 'years').format('YYYY-MM-DD'),
      page: pageParam,
    });
    return result;
  }, []);
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['upcomming-movies'],
      queryFn: getUpcommingMovies,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  const movies = useMemo(() => {
    return data?.pages.reduce<Movie[]>((allMovies, page) => {
      return allMovies.concat(page.results);
    }, []);
  }, [data]);

  //다음 페이지 더 보여주는 함수
  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  //아래로 당길때 새로고침 되는 함수
  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    movies,
    isLoading,
    loadMore,
    canLoadmore: hasNextPage,
    refresh,
  };
};

export default useMovies;
