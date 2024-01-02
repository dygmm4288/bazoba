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

  // useEffect(() => {
  //   getBookmarkedPosts('b2b4e958-d3f5-42dd-bca6-a5eef785c8c9').then((posts) =>
  //     console.log(posts)
  //   );
  // }, []);s

  const anchorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (anchorRef.current) {
      // console.log(anchorRef.current);
      observer.observe(anchorRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, anchorRef]);

  return (
    <StSection>
      <Skeleton loading={isLoading} active paragraph={{ rows: 10 }}>
        {data?.pages.map((posts, idx) => (
          <List
            itemLayout="vertical"
            dataSource={posts}
            loading={isLoading}
            renderItem={(post) => <Post post={post} key={idx} />}
            key={idx}
          />
        ))}
        <div id="scroll-anchor" ref={anchorRef} />
      </Skeleton>
    </StSection>
  );
};
export default PostList;
