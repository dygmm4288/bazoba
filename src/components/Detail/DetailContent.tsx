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
  const [coAuthorsAvatars, setCoAuthorsAvatars] = useState<string[]>([]);
  const [coAuthorsIds, setCoAuthorsIds] = useState<string[]>([]);

  console.log(post?.co_authors.map((coAuthor) => coAuthor.users!.id));

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
          <CreatedDate>{createdDate}</CreatedDate>
          {coAuthorsIds.length > 0 && (
            <div>
              <h3>작성자</h3>
              <CoAuthorsIdsList>
                {post.co_authors.map((coAuthor) => {
                  if (coAuthor.users?.id === post.author) {
                    return (
                      <div key={coAuthor.users?.id}>
                        <img src={coAuthor.users?.avatar_url} alt="Avatar" />
                        <p>{coAuthor.users?.nickname}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </CoAuthorsIdsList>
            </div>
          )}
          <Title>{post.title}</Title>
          <Category>Category: {post.category}</Category>
          <Thumbnail src={post.thumbnail_url} alt="Thumbnail" />
          <Viewer initialValue={post.contents} />
          {coAuthorsAvatars.length > 0 && (
            <div>
              <h3>Co-Authors' Avatars:</h3>
              <AvatarList>
                {coAuthorsAvatars.map((avatarUrl, index) => (
                  <Avatar
                    key={index}
                    src={avatarUrl}
                    alt={`Co-Author ${index + 1}`}
                  />
                ))}
              </AvatarList>
            </div>
          )}
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

const CoAuthorsIdsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CoAuthorId = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const AvatarList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
