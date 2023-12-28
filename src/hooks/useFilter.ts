import { useQueryPosts } from './useSupabase';

export function useFilter(category: string) {
  // console.log(category);
  const { posts, isError, isLoading } = useQueryPosts(category);

  return { posts, isError, isLoading };
}
