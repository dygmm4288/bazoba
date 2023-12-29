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
  const { posts } = useFilter(filter);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useQueryPostsByPage();

  return (
    <Skeleton
      loading={isLoading}
      active
      paragraph={{ rows: 10 }}
      style={{ width: '800px', margin: '0 auto' }}
    >
      {data?.pages.map((posts, idx) => (
        <List
          style={{ width: '800px', margin: '0 auto' }}
          itemLayout="vertical"
          dataSource={posts}
          loading={isLoading}
          size="large"
          renderItem={(post) => <Post post={post} key={idx} />}
          key={idx}
        />
      ))}
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
// {data.pages.map((group, i) => (
//   <React.Fragment key={i}>
//     {group.map(ticket => (
//       <div key={ticket.id}>{/* Render ticket */}</div>
//     ))}
//   </React.Fragment>
// ))}
export default PostList;
