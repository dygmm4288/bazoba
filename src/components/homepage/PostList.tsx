import { List, Skeleton } from 'antd';
import { useRecoilValue } from 'recoil';
import { useFilter } from '../../hooks/useFilter';
import { filterState } from '../../recoil/filter';
import Post from './Post';

const PostList = () => {
  // const posts = db.posts as PostType[];
  // const { posts } = useQueryPosts();
  const filter = useRecoilValue(filterState);
  const { posts, isLoading, isError } = useFilter(filter);

  return (
    <Skeleton
      loading={isLoading}
      active
      paragraph={{ rows: 10 }}
      style={{ width: '800px', margin: '0 auto' }}
    >
      <List
        style={{ width: '800px', margin: '0 auto' }}
        itemLayout="vertical"
        dataSource={posts}
        loading={isLoading}
        size="large"
        renderItem={(post) => (
          <List.Item key={post.title}>
            <Post post={post} />
          </List.Item>
        )}
      />
    </Skeleton>
  );
};

export default PostList;
