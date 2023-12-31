import React from 'react';
import {
  useFilteredPosts,
  useQueryBookmarkPostsByPage,
  useQueryMYPostsByPage
} from '../../hooks/query/useSupabase';
import { List, Skeleton } from 'antd';
import Post from '../homepage/Post';

interface Props {
  db: string;
  filterKey: string;
  filterValue: string;
}

function FilteredBookmarkPosts({ filterKey, filterValue }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useQueryBookmarkPostsByPage(filterKey, filterValue);

  console.log('FilteredBookmarkPosts', data?.pages[0][0]);

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
            renderItem={(item) => <Post post={item.posts} key={idx} />}
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
