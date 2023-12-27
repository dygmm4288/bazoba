import db from '../../db.json';
import { PostType } from '../../supabase/supabase.types';
import Post from './Post';

const PostList = () => {
  const posts = db.posts as PostType[];

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
