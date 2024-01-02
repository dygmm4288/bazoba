import { Viewer } from '@toast-ui/react-editor';
import { useQueryPost } from '../../hooks/query/useSupabase';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { Avatar, Tooltip } from 'antd';

interface DetailContentProps {
  id: string;
}

function DetailContent({ id }: DetailContentProps) {
  const { post } = useQueryPost(id);
  const [createdDate, setCreatedDate] = useState('');
  const [coAuthorsAvatars, setCoAuthorsAvatars] = useState<string[]>([]);
  const [coAuthorsIds, setCoAuthorsIds] = useState<string[]>([]);

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

    if (post && post.co_authors) {
      const avatars = post.co_authors.map(
        (coAuthor) => coAuthor.users?.avatar_url || ''
      );
      setCoAuthorsAvatars(avatars);

      const coAuthorsIds = post.co_authors.map(
        (coAuthor) => coAuthor.users!.id
      );
      setCoAuthorsIds(coAuthorsIds);
    }
  }, [post]);

  return (
    <Container>
      {post && (
        <div>
          <Title>{post.title}</Title>
          {coAuthorsIds.length > 0 && (
            <div>
              <WritersList>
                {post.co_authors.map((coAuthor) => {
                  if (coAuthor.users?.id === post.author) {
                    return (
                      <WriterContainer key={coAuthor.users?.id}>
                        <h2>작성자</h2>
                        <WriterSection>
                          <WriterAvatar
                            src={coAuthor.users?.avatar_url}
                            alt="Avatar"
                          />
                          <WriterNickname>
                            {coAuthor.users?.nickname}
                          </WriterNickname>
                        </WriterSection>
                      </WriterContainer>
                    );
                  }
                  return null;
                })}
              </WritersList>
            </div>
          )}

          {coAuthorsAvatars.length > 0 && (
            <div>
              <h2>Member</h2>
              <Avatar.Group>
                {coAuthorsAvatars.map((avatarUrl, index) => (
                  <Tooltip
                    key={index}
                    title={
                      post.co_authors[index].users?.nickname ||
                      `Writer ${index + 1}`
                    }
                    placement="top"
                  >
                    <CustomAvatar src={avatarUrl} alt={`Writer ${index + 1}`} />
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          )}
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

const WriterSection = styled.div`
  display: flex;
`;

const WriterContainer = styled.div`
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

const WriterAvatar = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
`;

const WriterNickname = styled.p`
  font-size: 25px;
  color: #555;
  margin-left: 10px;
  margin-top: 10px;
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

const WritersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CustomAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;
