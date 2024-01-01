import { Tables } from './supabaseSchema.types';

export type PostType = Tables<'posts'>;
export type BookmarkType = Tables<'bookmarks'>;
export type CommentType = Tables<'comments'>;
export type LikeType = Tables<'likes'>;
export type UserType = Tables<'users'>;
export type CoAuthorType = Tables<'co_authors'>;

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

export type FetchPostsResultType = PostType & { bookmarks: BookmarkType[] } & {
  likes: LikeType[];
};

// Read Functions
export type OptionType = {
  page?: number;
  order?: {
    column: string;
    desc: boolean;
  };
  category?: CategoryType;
};

export type getPost = (id: string) => PostType | null;
export type getPosts = (option?: OptionType) => PostType[];
export type getPostsByPage = (page: number, option?: string) => PostType[];
export type getComments = () => CommentType[];
export type getComment = (id: string) => CommentType;

// Update Functions
export type updatePostForContent = (
  id: number,
  content: Partial<PostType>
) => void;
export type updatePost = (id: string, contents: Partial<PostType>) => void;
export type updateComment = (
  id: string,
  updatedContent: Partial<CommentType>
) => void;

// Create Functions
export type addPost = (post: PostType) => void;
export type addBookmark = (id: string, userId: string) => void;
export type addLike = (id: string, userId: string) => void;
export type addComment = (id: string, comment: CommentType) => void;

// Delete Functions
export type removeLike = (id: string, userId: string) => void;
export type removeBookmark = (id: string, userId: string) => void;
export type removePost = (id: string) => void;
export type removeComment = (id: string) => void;

export type User = {
  id: string;
  user_metadata: {
    avatar_url: string;
    email: string;
    user_name: string;
  };
};
