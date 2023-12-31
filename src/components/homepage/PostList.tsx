import { List, Skeleton } from 'antd';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryPostsByPage } from '../../hooks/query/useSupabase';
import { postCategoryFilterState } from '../../recoil/filter';
import Post from './Post';

const PostList = () => {
  const postCategoryFilter = useRecoilValue(postCategoryFilterState);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useQueryPostsByPage(postCategoryFilter);

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
      console.log(anchorRef.current);
      observer.observe(anchorRef.current);
    }
    return () => observer.disconnect();
  }, [anchorRef.current, observer]);

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
      <div id="scroll-anchor" ref={anchorRef} />
    </Skeleton>
  );
};
export default PostList;
