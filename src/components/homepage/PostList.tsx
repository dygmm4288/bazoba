import { useEffect } from 'react';
import { useQueryPosts } from '../../hooks/useSupabase';
import Post from './Post';

const PostList = () => {
  // const posts = db.posts as PostType[];
  const { posts, refetchPosts } = useQueryPosts();

  useEffect(() => {
    refetchPosts();
  }, []);

  console.log(posts);
  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
