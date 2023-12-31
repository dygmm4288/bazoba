import { createClient } from '@supabase/supabase-js';
import { CategoryType, UserType } from './supabase.types';
import {
  Database,
  TableKeys,
  TablesInsert,
  TablesUpdate
} from './supabaseSchema.types';

export const db = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_API_KEY!
);

/* Read */
export const fetchPost = async (id: string) => {
  const { data, error } = await db
    .from('posts')
    .select(`*, likes(*), bookmarks(*), co_authors(*,users(*))`)
    .eq('id', id);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchComment = async (postId: string) => {
  const { data, error } = await db
    .from('comments')
    .select('*, users(*)')
    .eq('postId', postId);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchMostLikedPost = async () => {
  const { data, error } = await db
    .from('posts')
    .select(`*, likes(*)`)
    .order('likes', { ascending: false });
  if (error) return Promise.reject(error);
  return data;
};

export const fetchfilteredPosts = async (
  optionKey: string,
  optionVaule: string
) => {
  const { data, error } = await db
    .from('posts')
    .select(`*, likes(*), bookmarks(*)`)
    .eq(optionKey, optionVaule);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchPostsByPage = async (
  pageParam: number,
  postCategoryFilter: CategoryType[]
) => {
  const from = pageParam * 3;
  const to = from + 2;

  if (postCategoryFilter.length === 0) {
    const { data, error } = await db
      .from('posts')
      .select('*, likes(*), bookmarks(*)')
      .range(from, to)
      .order('created_at', { ascending: false });
    if (error) return Promise.reject(error);
    return data;
  } else {
    const { data, error } = await db
      .from('posts')
      .select('*, likes(*), bookmarks(*)')
      .in('category', postCategoryFilter)
      .range(from, to)
      .order('created_at', { ascending: false });
    if (error) return Promise.reject(error);
    return data;
  }
};

export const fetchMyPostsByPage = async (pageParam: number, userId: string) => {
  const from = pageParam * 3;
  const to = from + 2;

  const { data, error } = await db
    .from('posts')
    .select('*, likes(*), bookmarks(*)')
    .eq('author', userId)
    .range(from, to)
    .order('created_at', { ascending: false });
  if (error) return Promise.reject(error);
  return data;
};

export const fetchMyBookmarkPostsByPage = async (
  pageParam: number,
  userId: string
) => {
  const from = pageParam * 3;
  const to = from + 2;

  const { data, error } = await db
    .from('bookmarks')
    .select('*, posts(*,likes(*), users(*))')
    .eq('userId', userId)
    .range(from, to);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchMyProjectByPage = async (
  pageParam: number,
  userId: string
) => {
  const from = pageParam * 3;
  const to = from + 2;

  const { data, error } = await db
    .from('co_authors')
    .select('*, posts(*,likes(*), users(*))')
    .eq('userId', userId)
    .range(from, to);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchUser = async (id: string) => {
  const { data, error } = await db.from('users').select('*').eq('id', id);
  if (error) return Promise.reject(error);
  return data ? data[0] : null;
};

export const fetchNotifications = async (id: string) => {
  const { data, error } = await db
    .from('notifications')
    .select('*')
    .eq('recipientUserId', id)
    .order('created_at', { ascending: false });
  if (error) return Promise.reject(error);
  return data;
};

export type AddUserType = (user: UserType) => Promise<void>;

export const addUser: (user: UserType) => Promise<void> = async (
  user: UserType
) => {
  const { error } = await db.from('users').insert(user);
  if (error) return Promise.reject(error);
};

/* Create */
export const add =
  (from: TableKeys) =>
  async (data: TablesInsert<TableKeys> | TablesInsert<TableKeys>[]) => {
    const { data: response, error } = await db
      .from(from)
      .insert(data as TablesInsert<TableKeys>)
      .select('*');

    if (error) return Promise.reject(error);
    return response[0];
  };
export const addPost = add('posts');
export const addBookmark = add('bookmarks');
export const addLike = add('likes');
export const addComment = add('comments');
export const addNotification = add('notifications');
export const addCoAuthor = add('co_authors');

/* Delete */
export const remove = (from: TableKeys) => async (id: string) => {
  const { error } = await db.from(from).delete().eq('id', id);
  if (error) return Promise.reject(error);
  return true;
};
export const removePost = remove('posts');
export const removeLike = remove('likes');
export const removeBookmark = remove('bookmarks');
export const removeComment = remove('comments');
export const removeNotification = remove('notifications');

export const removeCoAuthor = async (postId: string) => {
  return await db.from('co_authors').delete().eq('postId', postId);
};

/* Update */
export const update =
  (from: TableKeys) => async (data: TablesUpdate<TableKeys>) => {
    const { data: response, error } = await db
      .from(from)
      .update(data)
      .eq('id', data.id!)
      .select();
    if (error) return Promise.reject(error);
    return response[0];
  };

export const updatePost = update('posts');
export const updateComment = update('comments');
export const updateUser = update('users');
export const updateNotification = update('notifications');
export const updateCoAuthor = update('co_authors');

/* Storage */
export const uploadImage = async (blob: Blob | File) => {
  const BASE_URL =
    'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/';
  const BUCKET_NAME = 'post_images';

  const { data, error } = await db.storage
    .from(BUCKET_NAME)
    .upload(window.URL.createObjectURL(blob), blob);
  return { data: BASE_URL + data?.path, error };
};

/** strorage에 본인 userId 폴더만 접근 가능하게 함*/
export const uploadUserImage = async (subUrl: string, file: File) => {
  const BASE_URL = `https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/user_images/`;

  const { data, error } = await db.storage
    .from('user_images')
    .upload(`${subUrl}`, file, { upsert: true });
  return { data: BASE_URL + data?.path, error };
};

/* Realtime */
export const handleNotification = (callback: Function) => {
  db.channel('notifications')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      (payload) => {
        return callback(payload);
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'notifications' },
      (payload) => {
        return callback(payload);
      }
    )
    .subscribe();
};
export const fetchUserBy = async (searchStr: string) => {
  const { data, error } = await db
    .from('users')
    .select('*')
    .like('email', `%${searchStr}%`);
  if (error) return Promise.reject(error);
  return data;
};
