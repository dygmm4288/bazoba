export const POST_QUERY_KEY = (postId: string) => ['posts', postId];

export const POSTS_QUERY_KEY = ['posts'];
export const COMMENT_QUERY_KEY = (postId: string) => ['comments', postId];
export const USER_QUERY_KEY = (userId: string) => ['users', userId];
export const NOTIFICATION_QUERY_KEY = (userId: string) => [
  'notifications',
  userId
];
