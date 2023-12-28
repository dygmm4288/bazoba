import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import {
  UpdateCommentType,
  fetchComment,
  fetchPost,
  fetchPosts,
  updateComment,
  addComment
} from '../supabase';

const POST_QUERY_KEY = (postId: string) => ['post', postId];
const POSTS_QUERY_KEY = ['posts'];
const COMMENT_QUERY_KEY = (postId: string) => ['comment', postId];

const client = new QueryClient();
export function useQueryPost(postId: string) {
  const { data, error } = useQuery({
    queryKey: POST_QUERY_KEY(postId),
    queryFn: ({ queryKey }) => fetchPost(queryKey[1])
  });
  return { post: data && data[0], error };
}
export function useQueryPosts() {
  const {
    data: posts,
    error,
    refetch: refetchPosts
  } = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
    enabled: false
  });
  return { posts, error, refetchPosts };
}

export function useQueryComment(postId: string) {
  const { data: comments, error } = useQuery({
    queryKey: COMMENT_QUERY_KEY(postId),
    queryFn: ({ queryKey }) => fetchComment(queryKey[1])
  });
  return { comments, error };
}

export function useUpdateComment(postId: string) {
  const { mutate: update } = useMutation({
    mutationFn: (commentContent: UpdateCommentType) =>
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

export function useAddComment(postId: string) {
  const { mutate: insert } = useMutation({
    mutationFn: (comment: CommentType) => addComment(comment),
    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey: COMMENT_QUERY_KEY(postId) });
    }
  });
  return {
    addComment: insert
  };
}

export function SupabaseQueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
