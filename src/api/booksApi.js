import { useInfiniteQuery } from "@tanstack/react-query";
import api from "./axiosInstance";

const fetchBooks = async ({ param = 1, query }) => {
  const response = await api.get("", {
    params: {
      query,
      display: 20,
      start: (param - 1) * 20 + 1,
    },
  });
  return {
    items: response.data.items,
    nextPage: response.data.items.length > 0 ? param + 1 : undefined,
  };
};

const useBooksQuery = (searchQuery) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["books", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchBooks({ pageParam, query: searchQuery }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!searchQuery,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  };
};

export default useBooksQuery;
