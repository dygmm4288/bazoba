import { createClient } from '@supabase/supabase-js';
import {
  BookmarkType,
  CommentType,
  LikeType,
  PostType
} from './supabase.types';
import { Database } from './supabaseSchema.types';

export const db = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_API_KEY!
);

export const fetchPost = async (id: string) => {
  const { data, error } = await db
    .from('post')
    .select('*,id,like(id), bookmark(id)')
    .eq('id', id);
  if (error) return Promise.reject(error);
  return data;
};

export const fetchComment = async (postId: string) => {
  const { data } = await db.from('comment').select('*').eq('postId', postId);
  return data;
};

type OptionType = {
  page?: number;
  order?: {
    column: string;
    desc: boolean;
  };
};
export const fetchPosts = async (option?: string) => {
  console.log(option);
  if (option) {
    const { data, error } = await db
      .from('post')
      .select(`*, like(*), bookmark(*)`)
      .eq('category', option);
    if (error) return Promise.reject(error);
    return data;
  }

  const { data, error } = await db
    .from('post')
    .select(`*, like(*), bookmark(*)`);

  if (error) return Promise.reject(error);
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

export type AddCommentType = (comment: CommentType) => Promise<void>;
export const addComment: AddCommentType = async (comment: CommentType) =>
  add('comment', comment.id);

type UpdateType = (
  postContent: Partial<PostType> & Pick<PostType, 'id'>
) => Promise<void>;
export const updatePost: UpdateType = async (postContent) => {
  db.from('post').update(postContent).eq('id', postContent.id);
};
export type UpdateCommentType = Partial<CommentType> & Pick<CommentType, 'id'>;
export type UpdateCommentFunctionType = (
  commentContent: Partial<CommentType> & Pick<CommentType, 'id'>
) => Promise<void>;
export const updateComment: UpdateCommentFunctionType = async (
  commentContent
) => {
  await db
    .from('comment')
    .update(commentContent)
    .eq('id', commentContent.id)
    .select();
};

export const removePost = (post: PostType) => remove('post', post.id);
export const removeLike = (like: LikeType) => remove('like', like.id);
export const removeBookmark = (bookmark: BookmarkType) =>
  remove('bookmark', bookmark.id);
export const removeComment = (comment: CommentType) =>
  remove('comment', comment.id);
