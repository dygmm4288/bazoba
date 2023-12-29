import React from 'react';
import { useFilteredPosts } from '../../hooks/query/useSupabase';
import { List, Skeleton } from 'antd';
import Post from '../homepage/Post';

interface Props {
  optionKey: string;
  optionValue: string;
  refetchTrigger: boolean;
}

function FilteredPosts({ optionKey, optionValue, refetchTrigger }: Props) {
  const { posts, isLoading, refetchPosts } = useFilteredPosts(
    optionKey,
    optionValue
  );

  if (refetchTrigger) refetchPosts();
  return (
    <div>
      <Skeleton
        loading={isLoading}
        active
        paragraph={{ rows: 10 }}
        style={{ width: '800px', margin: '0 auto' }}
      >
        {
          <List
            style={{ width: '800px', margin: '0 auto' }}
            itemLayout="vertical"
            dataSource={posts}
            loading={isLoading}
            size="large"
            renderItem={(post) => <Post post={post} key={post.id} />}
          />
        }
      </Skeleton>
    </div>
  );
}

export default FilteredPosts;
