import { List, Skeleton } from 'antd';
import { useRecoilValue } from 'recoil';
import { useQueryPostsByPage } from '../../hooks/query/useSupabase';
import { useFilter } from '../../hooks/useFilter';
import { filterState } from '../../recoil/filter';
import Post from './Post';

const PostList = () => {
  // const posts = db.posts as PostType[];
  // const { posts } = useQueryPosts();
  const filter = useRecoilValue(filterState);
  const { posts, isLoading, isError } = useFilter(filter);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQueryPostsByPage();

  console.log(data?.pages);
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
        renderItem={(post) => <Post post={post} />}
      />
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </Skeleton>
  );
};

export default PostList;
