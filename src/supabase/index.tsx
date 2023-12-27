import { createClient } from '@supabase/supabase-js';
import {
  BookmarkType,
  FetchPostsResultType,
  LikeType,
  PostType
} from './supabase.types';
import { Database } from './supabaseSchema.types';

export const db = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_API_KEY!
);

export const fetchPost = async (id: string) => {
  const { data } = await db
    .from('post')
    .select('*,id,like(id), bookmark(id)')
    .eq('id', id);
  return data;
};
type OptionType = {
  page?: number;
  order?: {
    column: string;
    desc: boolean;
  };
};

export const fetchPosts = async () => {
  const { data, error } = await db
    .from('post')
    .select(`*, like(*), bookmark(*)`)
    .returns<FetchPostsResultType[]>();
  if (error) throw error;
  return data;
};

type AddType<T> = (from: string, data: T) => void;

export const add: AddType<unknown> = async (from, data) => {
  db.from(from).insert(data);
};

type RemoveType = (from: string, id: string) => Promise<void>;
export const remove: RemoveType = async (from, id) => {
  db.from(from).delete().eq('id', id);
};

export const addPost = (post: PostType) => add('post', post);
export const addBookmark = (bookmark: BookmarkType) =>
  add('bookmark', bookmark);
export const addLike = (like: LikeType) => add('like', like);

type UpdateType = (
  postContent: Partial<PostType> & Pick<PostType, 'id'>
) => Promise<void>;
export const updatePost: UpdateType = async (postContent) => {
  db.from('post').update(postContent).eq('id', postContent.id);
};

export const removePost = (post: PostType) => remove('post', post.id);
export const removeLike = (like: LikeType) => remove('like', like.id);
export const removeBookmark = (bookmark: BookmarkType) =>
  remove('bookmark', bookmark.id);
