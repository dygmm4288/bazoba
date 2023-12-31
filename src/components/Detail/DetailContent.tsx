import { Viewer } from '@toast-ui/react-editor';
import { useQueryPost } from '../../hooks/query/useSupabase';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface DetailContentProps {
  id: string;
}

function DetailContent({ id }: DetailContentProps) {
  const { post } = useQueryPost(id);
  const [createdDate, setCreatedDate] = useState('');

  useEffect(() => {
    if (post && post.created_at) {
      const parsedDate = new Date(post.created_at);
      const formattedDate = parsedDate.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        dateStyle: 'full',
        timeStyle: 'short'
      });
      setCreatedDate(formattedDate);
    }
  }, [post]);

  return (
    <Container>
      {post && (
        <div>
          <Title>{post.title}</Title>
          <Category>Category: {post.category}</Category>
          <CreatedDate>{createdDate}</CreatedDate>
          <Thumbnail src={post.thumbnail_url} alt="Thumbnail" />
          <Viewer initialValue={post.contents} />
        </div>
      )}
    </Container>
  );
}

export default DetailContent;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 30px;
  color: #333;
`;

const Category = styled.p`
  font-size: 20px;
  font-style: italic;
  color: #888;
`;

const CreatedDate = styled.p`
  font-size: 15px;
  text-align: right;
  color: #555;
  margin-bottom: 10px;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;
