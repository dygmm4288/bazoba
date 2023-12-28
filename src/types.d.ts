declare type PostType = {
  id: string;
  title: string;
  contents: string;
  email?: string;
  author: string;
  category: string;
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
  userId?: string;
  password?: string;
};

type ForeignKeyType = {
  id: string;
  postId: string;
  userId: string;
};

declare type ReviewType = ForeignKeyType;
declare type LikeType = ForeignKeyType;
declare type BookmarkType = ForeignKeyType;
