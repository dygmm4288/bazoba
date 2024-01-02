import React, { useEffect, useRef } from 'react';
import { useQueryBookmarkPostsByPage } from '../../hooks/query/useSupabase';
import { List, Skeleton } from 'antd';
import Post from '../homepage/Post';

interface Props {
  userId: string;
}

function FilteredBookmarkPosts({ userId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useQueryBookmarkPostsByPage(userId); // 여기랑

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }
    return () => observer.disconnect();
  }, [anchorRef.current, observer]);

  return (
    <div>
      <Skeleton
        loading={isLoading}
        active
        paragraph={{ rows: 10 }}
        style={{ width: '600px', margin: '0 auto' }}
      >
        {data?.pages.map((posts, idx) => (
          <List
            style={{ width: '600px', margin: '0 auto' }}
            itemLayout="vertical"
            dataSource={posts}
            loading={isLoading}
            size="large"
            renderItem={(item) => <Post post={item.posts} key={idx} />} //여기만 다름
            key={idx}
          />
        ))}
        <div id="scroll-anchor" ref={anchorRef} />
      </Skeleton>
    </div>
  );
}

export default FilteredBookmarkPosts;
