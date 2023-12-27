import db from '../../db.json';
import Post from './Post';

const PostList = () => {
  const { posts } = db;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
