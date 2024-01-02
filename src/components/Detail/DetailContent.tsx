import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryPost, useQueryUser } from '../../hooks/query/useSupabase';

import { Avatar, Tooltip } from 'antd';

interface DetailContentProps {
  id: string;
}

function DetailContent({ id }: DetailContentProps) {
  const { post } = useQueryPost(id);
  const [createdDate, setCreatedDate] = useState('');
  const [coAuthorsAvatars, setCoAuthorsAvatars] = useState<string[]>([]);
  const [coAuthorsIds, setCoAuthorsIds] = useState<string[]>([]);
  const { user } = useQueryUser(post?.author!);

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
    // optional chaining 추가
    if (post && post.co_authors) {
      const avatars = post.co_authors?.map(
        (coAuthor) => coAuthor.users?.avatar_url || ''
      );
      setCoAuthorsAvatars(avatars);

      const coAuthorsIds = post.co_authors?.map(
        (coAuthor) => coAuthor.users!.id
      );
      setCoAuthorsIds(coAuthorsIds);
    }
  }, [post]);

  console.log('좋아요', post?.likes);
  console.log('북마크', post?.bookmarks);

  return (
    <Container>
      {post && (
        <div>
          <Title>{post.title}</Title>
          <Category>Category: {post.category}</Category>
          {post.co_authors && coAuthorsAvatars.length > 0 && (
            <StCoAuthorWrapper>
              <h2>Project Members</h2>

              <Avatar.Group>
                {coAuthorsAvatars?.map((avatarUrl, index) => (
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
            </StCoAuthorWrapper>
          )}
          {/* TODO Cannot read properties of undefined -> reading user */}
          <StHeaderWrapper>
            <WritersList>
              <WriterContainer>
                {/* <h2>작성자</h2> */}
                <WriterSection>
                  <WriterAvatar src={user?.avatar_url} alt="Avatar" />
                  <WriterNickname>{user?.nickname}</WriterNickname>
                </WriterSection>
              </WriterContainer>
            </WritersList>
            <CreatedDate>{createdDate}</CreatedDate>
          </StHeaderWrapper>
          <hr />
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
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 5px;
  margin-bottom: -4px;
  width: 100%;
  * {
    margin: 0;
  }
`;

const StHeaderWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: end;
`;
const WriterAvatar = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
`;

const WriterNickname = styled.p`
  font-size: 1.8rem;
  color: #555;
  margin-left: 10px;
  margin-top: 10px;
`;

const Title = styled.h2`
  margin: 24px 0;
  font-size: 30px;
  color: #333;
`;

const Category = styled.p`
  font-size: 1.6rem;
  font-style: italic;
  color: #888;
`;

const CreatedDate = styled.p`
  font-size: 15px;
  text-align: right;
  color: #555;
  margin-bottom: 2px;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const WritersList = styled.div`
  flex-wrap: wrap;
  gap: 10px;
`;

const StCoAuthorWrapper = styled.div`
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
  }
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  margin-top: -24px;
`;

const CustomAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;
