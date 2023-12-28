import { createClient } from '@supabase/supabase-js';
import { BookmarkType, LikeType, PostType, UserType } from './supabase.types';
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
  console.log(data);
  return data ? data[0] : null;
};

export type AddUserType = (user: UserType) => Promise<void>;

export const addUser: (user: UserType) => Promise<void> = async (
  user: UserType
) => {
  const { error } = await db.from('users').insert(user);
  if (error) return Promise.reject(error);
};

type AddType<T> = (from: string, data: T) => void;

export const add: AddType<unknown> = async (from, data) => {
  const { data: response, error } = await db.from(from).insert(data);
  if (error) return Promise.reject(error);
  return response;
};

type RemoveType = (from: string, id: string) => Promise<void>;
export const remove: RemoveType = async (from, id) => {
  db.from(from).delete().eq('id', id);
};

export const addPost = (post: PostType) => add('post', post);
export const addBookmark = (bookmark: BookmarkType) =>
  add('bookmark', bookmark);
export const addLike = (like: LikeType) => add('like', like);
export type NewCommentType = Omit<Omit<CommentType, 'id'>, 'postId'>;
export type AddCommentType = (
  newComment: Omit<CommentType, 'id'>
) => Promise<void>;

export const addComment: AddCommentType = async (newComment) =>
  add('comment', newComment);

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
