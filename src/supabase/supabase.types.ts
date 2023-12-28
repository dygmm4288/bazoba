export type PostType = {
  id: string;
  title: string;
  contents: string;
  email?: string | null;
  author: string;
  category: CategoryType;
};
export type CategoryType =
  | 'REACT'
  | 'NODE'
  | 'SPRING'
  | 'AI'
  | 'UI/UX'
  | 'ANDROID'
  | 'UNITY'
  | 'IOS'
  | 'ETC';

export type FetchPostsResultType = PostType & { bookmark: BookmarkType[] } & {
  like: LikeType[];
};

export type CommentType = {
  id: string;
  postId: string;
  content: string;
  userId?: string;
};

type ForeignKeyType = {
  id: string;
  postId: string;
  userId: string;
};

export type ReviewType = { content: string } & ForeignKeyType;
export type LikeType = ForeignKeyType;
export type BookmarkType = ForeignKeyType;
export type getPost = (id: string) => PostType | null;
export type getPostsByPage = (page: number, option?: string) => PostType[];

export type updatePostForContent = (
  id: number,
  content: Partial<PostType>
) => void;
export type updatePost = (id: string, contents: Partial<PostType>) => void;

export type addPost = (post: PostType) => void;
export type addBookmark = (id: string, userId: string) => void;
export type addLike = (id: string, userId: string) => void;

export type removeLike = (id: string, userId: string) => void;
export type removeBookmark = (id: string, userId: string) => void;
export type removePost = (id: string) => void;

export type getComments = () => CommentType[];
export type getComment = (id: string) => CommentType;

export type addComment = (id: string, comment: CommentType) => void;

export type removeComment = (id: string) => void;

export type updateComment = (
  id: string,
  updatedContent: Partial<CommentType>
) => void;
