import { PostgrestError } from '@supabase/supabase-js';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import {
  addComment,
  addUser,
  fetchComment,
  fetchPost,
  fetchPosts,
  fetchUser,
  updateComment
} from '../../supabase';
import { SupabaseErrorTypes } from '../../supabase/error.types';
import { TablesInsert } from '../../supabase/supabaseSchema.types';
import { COMMENT_QUERY_KEY, POST_QUERY_KEY } from './query.keys';

const client = new QueryClient();

export function useQueryPost(postId: string) {
  const { data, error } = useQuery({
    queryKey: POST_QUERY_KEY(postId),
    queryFn: ({ queryKey }) => fetchPost(queryKey[1]),
    retry: (failureCount, error: PostgrestError) => {
      if (error.code === SupabaseErrorTypes.BAD_REQUEST) return false;
      return failureCount < 2;
    }
  });
  return { post: data && data[0], error };
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

export function useQueryComment(postId: string) {
  const { data: comments, error } = useQuery({
    queryKey: COMMENT_QUERY_KEY(postId),
    queryFn: ({ queryKey }) => fetchComment(queryKey[1])
  });
  return { comments, error };
}

export function useQueryUser(author: string) {
  const {
    data: user,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['users', author],
    queryFn: () => fetchUser(author)
  });

  return { user, error, isLoading, isError };
}

export function useAddUser() {
  const { mutate: insert } = useMutation({
    mutationFn: (user: UserType) => addUser(user),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('몰?루', error);
    }
  });
  return {
    addUser: insert
  };
}
export function useAddComment(postId: string) {
  const { mutate: insert } = useMutation({
    mutationFn: (newComment: Omit<TablesInsert<'comments'>, 'postId'>) =>
      addComment({ ...newComment, postId }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: COMMENT_QUERY_KEY(postId) });
    },
    onError: (error) => {
      console.error('알 수 없는 에러 발생... 일해라 개발자...', error);
    }
  });
  return {
    addComment: insert
  };
}

export function useUpdateComment(postId: string) {
  const { mutate: update } = useMutation({
    mutationFn: (commentContent: Omit<TablesInsert<'comments'>, 'postId'>) =>
      updateComment(commentContent),
    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey: COMMENT_QUERY_KEY(postId) });
    }
  });

  return {
    updateComment: update
  };
}

export function SupabaseQueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
