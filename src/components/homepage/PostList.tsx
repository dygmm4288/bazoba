import { useRecoilState } from 'recoil';
import { useFilter } from '../../hooks/useFilter';
import { useQueryPosts } from '../../hooks/useSupabase';
import { filterState } from '../../shared/atoms';
import Post from './Post';

const PostList = () => {
  // const posts = db.posts as PostType[];
  const { posts } = useQueryPosts();
  const [filter, _] = useRecoilState(filterState);
  const { posts: postsFromFilter } = useFilter(filter);

  // console.log(posts);
  console.log(postsFromFilter);
  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
