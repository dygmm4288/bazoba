export type getPost = (id: string) => PostType | null;
export type getPostsByPage = (page: number, option?: string) => PostType[];

export type updatePostForContent = (
  id: number,
  content: Partial<PostType>,
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
  updatedContent: Partial<CommentType>,
) => void;
