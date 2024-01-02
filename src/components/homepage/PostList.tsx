import { List, Skeleton } from 'antd';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { StSection } from '../../GlobalStyle';
import { useQueryPostsByPage } from '../../hooks/query/useSupabase';
import { postCategoryFilterState } from '../../recoil/filter';
import Post from './Post';

const PostList = () => {
  const postCategoryFilter = useRecoilValue(postCategoryFilterState);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useQueryPostsByPage(postCategoryFilter);

  const anchorRef_main = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer_main = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    if (anchorRef_main.current) {
      observer_main.observe(anchorRef_main.current);
    }
    return () => observer_main.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, anchorRef_main]);

  return (
    <StSection>
      <Skeleton loading={isLoading} active paragraph={{ rows: 10 }}>
        {data?.pages.map((posts, idx) => (
          <List
            itemLayout="vertical"
            dataSource={posts}
            loading={isLoading}
            renderItem={(post) => <Post id={post.id} key={idx} />}
            key={idx}
          />
        ))}
      </Skeleton>
      <div id="scroll-anchor" ref={anchorRef_main} style={{ height: '50px' }} />
    </StSection>
  );
};
export default PostList;
