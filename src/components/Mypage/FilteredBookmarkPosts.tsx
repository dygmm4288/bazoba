import React from 'react';
import { useQueryBookmarkPostsByPage } from '../../hooks/query/useSupabase';
import { List, Skeleton } from 'antd';
import Post from '../homepage/Post';

interface Props {
  userId: string;
}

function FilteredBookmarkPosts({ userId }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useQueryBookmarkPostsByPage(userId); // 여기랑

  return (
    <div>
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
            renderItem={(item) => <Post post={item.posts} key={idx} />} //여기만 다름
            key={idx}
          />
        ))}
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? '불러오는 중...'
            : hasNextPage
            ? '더 보기'
            : '더 불러올 문서가 없습니다'}
        </button>
      </Skeleton>
    </div>
  );
}

export default FilteredBookmarkPosts;