import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { fetchPost, fetchPosts } from '../supabase';

const POST_QUERY_KEY = (postId: string) => ['post', postId];
// const POSTS_QUERY_KEY = ['posts'];

const client = new QueryClient();
export function useQueryPost(postId: string) {
  const { data: post, error } = useQuery({
    queryKey: POST_QUERY_KEY(postId),
    queryFn: ({ queryKey }) => fetchPost(queryKey[1])
  });
  return { post, error };
}
export function useQueryPosts(option?: string) {
  const {
    data: posts,
    error,
    isLoading,
    isError,
    refetch: refetchPosts
  } = useQuery({
    queryKey: ['posts', option],
    queryFn: () => fetchPosts(option)
    // enabled: false
  });

  return { posts, error, isLoading, isError, refetchPosts };
}

export function SupabaseQueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
