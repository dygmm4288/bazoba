import { createClient } from '@supabase/supabase-js';
import { UserType } from './supabase.types';
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
    .select('*,id,likes(id), bookmarks(id)')
    .eq('id', id);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchComment = async (postId: string) => {
  const { data, error } = await db
    .from('comments')
    .select('*')
    .eq('postId', postId);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchPosts = async (option?: string) => {
  if (option) {
    const { data, error } = await db
      .from('posts')
      .select(`*, likes(*), bookmarks(*)`)
      .eq('category', option);
    if (error) return Promise.reject(error);
    return data;
  }

  const { data, error } = await db
    .from('posts')
    .select(`*, likes(*), bookmarks(*)`);

  if (error) return Promise.reject(error);
  return data;
};
// >>> addUser, fetchUser
export const fetchUser = async (id: string) => {
  const { data, error } = await db.from('users').select('*').eq('id', id);
  if (error) return Promise.reject(error);
  return data ? data[0] : null;
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
  (from: TableKeys) => async (data: TablesInsert<TableKeys>) => {
    const { error } = await db.from(from).insert(data);
    if (error) return Promise.reject(error);
    return data;
  };
export const addPost = add('posts');
export const addBookmark = add('bookmarks');
export const addLike = add('likes');
export const addComment = add('comments');

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

/* Update */
export const update =
  (from: TableKeys) => async (data: TablesUpdate<TableKeys>) => {
    const { error } = await db.from(from).update(data).eq('id', data.id!);
    if (error) return Promise.reject(error);
    return true;
  };

export const updatePost = update('posts');
export const updateComment = update('comments');

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
