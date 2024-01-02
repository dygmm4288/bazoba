import { PostgrestError } from '@supabase/supabase-js';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addBookmark,
  addComment,
  addLike,
  addNotification,
  addUser,
  fetchComment,
  fetchMyBookmarkPostsByPage,
  fetchMyPostsByPage,
  fetchMyProjectByPage,
  fetchNotifications,
  fetchPost,
  fetchPosts,
  fetchPostsByPage,
  fetchUser,
  fetchfilteredPosts,
  removeBookmark,
  removeComment,
  removeLike,
  removeNotification,
  removePost,
  updateComment,
  updateUser
} from '../../supabase';
import { SupabaseErrorTypes } from '../../supabase/error.types';
import { CategoryType } from '../../supabase/supabase.types';
import {
  TablesInsert,
  TablesUpdate
} from '../../supabase/supabaseSchema.types';
import {
  COMMENT_QUERY_KEY,
  NOTIFICATION_QUERY_KEY,
  POST_QUERY_KEY,
  USER_QUERY_KEY
} from './query.keys';

const client = new QueryClient();

/* Post */
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
  });

  return { posts, error, isLoading, isError, refetchPosts };
}

export function useRemovePost(postId: string) {
  const navigate = useNavigate();
  const { mutate: deletePost } = useMutation({
    mutationFn: async (likeId: string) => {
      const result = await removePost(likeId);
      return result;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: POST_QUERY_KEY(postId) });
      navigate('/');
    },
    onError: (error) => {
      console.error('알 수 없는 에러 발생... 일해라 개발자...', error);
    }
  });

  return {
    removePost: deletePost
  };
}

export function useFilteredPosts(optionKey: string, optionValue: string) {
  const {
    data: posts,
    error,
    isLoading,
    isError,
    refetch: refetchPosts
  } = useQuery({
    queryKey: ['post', optionKey, optionValue],
    queryFn: () => fetchfilteredPosts(optionKey, optionValue),
    enabled: false
  });

  return { posts, error, isLoading, isError, refetchPosts };
}

export function useQueryPostsByPage(postCategoryFilter: CategoryType[]) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['posts', postCategoryFilter],
    queryFn: ({ pageParam }) => fetchPostsByPage(pageParam, postCategoryFilter),
    getNextPageParam: (lastPage, allpages) =>
      lastPage.length ? allpages.length : undefined,
    initialPageParam: 0
  });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  };
}

export function useQueryMYPostsByPage(userId: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['my-posts'],
    queryFn: ({ pageParam }) => {
      return fetchMyPostsByPage(pageParam, userId); //이것만 다름
    },
    getNextPageParam: (lastPage, allpages) =>
      lastPage.length ? allpages.length : undefined,
    initialPageParam: 0
  });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  };
}

export function useQueryBookmarkPostsByPage(userId: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['bookmark-posts'],
    queryFn: ({ pageParam }) => {
      console.log(pageParam);
      return fetchMyBookmarkPostsByPage(pageParam, userId); //이것만 다름
    },
    getNextPageParam: (lastPage, allpages) =>
      lastPage.length ? allpages.length : undefined,
    initialPageParam: 0
  });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  };
}

export function useQueryMyProjectsByPage(userId: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['cowork-posts'],
    queryFn: ({ pageParam }) => {
      return fetchMyProjectByPage(pageParam, userId); //이것만 다름
    },
    getNextPageParam: (lastPage, allpages) =>
      lastPage.length ? allpages.length : undefined,
    initialPageParam: 0
  });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  };
}

/* User */
export function useQueryUser(userId: string) {
  const {
    data: user,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: USER_QUERY_KEY(userId),
    queryFn: () => fetchUser(userId)
  });

  return { user, error, isLoading, isError };
}

export function useAddUser() {
  const { mutate: insert } = useMutation({
    mutationFn: (user: TablesInsert<'users'>) => addUser(user),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error(error);
    }
  });
  return {
    addUser: insert
  };
}

export function useUpdateUser(userId: string) {
  const { mutate: update } = useMutation({
    mutationFn: (userData: TablesUpdate<'users'>) => updateUser(userData),
    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey: USER_QUERY_KEY(userId) });
    }
  });

  return {
    updateUser: update
  };
}

/* Comment */
export function useQueryComment(postId: string) {
  const { data: comments, error } = useQuery({
    queryKey: COMMENT_QUERY_KEY(postId),
    queryFn: ({ queryKey }) => fetchComment(queryKey[1])
  });
  return { comments, error };
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
      updateComment({ ...commentContent, postId }),
    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey: COMMENT_QUERY_KEY(postId) });
    }
  });

  return {
    updateComment: update
  };
}

export function useRemoveComment(postId: string) {
  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: string) => {
      const result = await removeComment(commentId);
      return result;
    },
    onSuccess: () => {
      console.log('success');
      client.invalidateQueries({ queryKey: COMMENT_QUERY_KEY(postId) });
    }
  });

  return {
    removeComment: deleteComment
  };
}

/* Like */
export function useAddLike(postId: string) {
  const { mutate: insert } = useMutation({
    mutationFn: (newLike: Omit<TablesInsert<'likes'>, 'postId'>) =>
      addLike({ ...newLike, postId }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: POST_QUERY_KEY(postId) });
    },
    onError: (error) => {
      console.error('알 수 없는 에러 발생... 일해라 개발자...', error);
    }
  });
  return {
    addLike: insert
  };
}

export function useRemoveLike(postId: string) {
  const { mutate: deleteLike } = useMutation({
    mutationFn: async (likeId: string) => {
      const result = await removeLike(likeId);
      return result;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: POST_QUERY_KEY(postId) });
    },
    onError: (error) => {
      console.error('알 수 없는 에러 발생... 일해라 개발자...', error);
    }
  });

  return {
    removeLike: deleteLike
  };
}

/* Bookmark */
export function useAddBookmark(postId: string) {
  const { mutate: insert } = useMutation({
    mutationFn: (newBookmark: Omit<TablesInsert<'bookmarks'>, 'postId'>) =>
      addBookmark({ ...newBookmark, postId }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: POST_QUERY_KEY(postId) });
    },
    onError: (error) => {
      console.error('알 수 없는 에러 발생... 일해라 개발자...', error);
    }
  });
  return {
    addBookmark: insert
  };
}

export function useRemoveBookmark(postId: string) {
  const { mutate: deleteBookmark } = useMutation({
    mutationFn: async (likeId: string) => {
      const result = await removeBookmark(likeId);
      return result;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: POST_QUERY_KEY(postId) });
    },
    onError: (error) => {
      console.error('알 수 없는 에러 발생... 일해라 개발자...', error);
    }
  });

  return {
    removeBookmark: deleteBookmark
  };
}

/* Notifications */

export function useQueryNotifications(id: string) {
  const {
    data: notifications,
    isLoading,
    isError
  } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY(id),
    queryFn: () => fetchNotifications(id)
  });
  return { notifications, isLoading, isError };
}

export function useAddNotification(id: string) {
  const { mutate: insert } = useMutation({
    mutationFn: (newNotification: TablesInsert<'notifications'>) =>
      addNotification(newNotification),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY(id)
      });
    },
    onError: (error) => {
      console.error('error :', error);
    }
  });
  return {
    addNotification: insert
  };
}

export function useRemoveNotification(id: string) {
  const { mutate: deleteNotification } = useMutation({
    mutationFn: async (id: string) => {
      const result = await removeNotification(id);
      return result;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY(id) });
    },
    onError: (error) => {
      console.error(error);
    }
  });
  return {
    removeNotification: deleteNotification
  };
}

export function SupabaseQueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
