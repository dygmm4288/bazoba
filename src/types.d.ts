declare type PostType = {
  id: string;
  title: string;
  contents: string;
  email?: string;
  author: string;
  category: CategoryType;
};
declare type CategoryType =
  | 'REACT'
  | 'NODE'
  | 'SPRING'
  | 'AI'
  | 'UI/UX'
  | 'ANDROID'
  | 'UNITY'
  | 'IOS'
  | 'ETC';

declare type CommentType = {
  id: string;
  postId: string;
  content: string;
  userId: string;
  password?: string;
  type: 0 | 1;
};

type ForeignKeyType = {
  id: string;
  postId: string;
  userId: string;
};
declare type LikeType = ForeignKeyType;
declare type BookmarkType = ForeignKeyType;
