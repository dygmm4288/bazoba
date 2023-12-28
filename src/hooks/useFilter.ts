import { useQueryPosts } from './useSupabase';

export function useFilter(category: string) {
  // console.log(category);
  const { posts } = useQueryPosts(category);

  return { posts };
}
