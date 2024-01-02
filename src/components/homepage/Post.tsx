import '@toast-ui/editor/dist/toastui-editor.css';
import { Avatar, Badge, Card, List, Modal, message } from 'antd';
import { MouseEvent, useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  useAddBookmark,
  useQueryComment,
  useQueryPost,
  useQueryUser,
  useRemoveBookmark
} from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { CategoryType } from '../../supabase/supabase.types';

type User = {
  id: string;
  nickname: string;
  email: string;
  avatar_url: string;
};

interface Props {
  id: string;
}

const Post = ({ id }: Props) => {
  const navigate = useNavigate();
  const { post } = useQueryPost(id);
  const [isBookmarked, setBookmarked] = useState(false);
  const { user } = useQueryUser(post?.author!);
  const { comments } = useQueryComment(id);
  const { addBookmark } = useAddBookmark(post?.id!);
  const { removeBookmark } = useRemoveBookmark(post?.id!);

  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState?.id || '';
  const { user: viewer } = useQueryUser(userId);
  const isLogin = !!userLoginState;

  const { Meta } = Card;
  const onPostCardClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    if (post?.bookmarks && user) {
      const userBookmarked = post.bookmarks.some(
        (bookmark) => bookmark.userId === viewer?.id
      );
      setBookmarked(userBookmarked);
    }
  }, [user]);

  const handleClickBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!viewer) {
      Modal.confirm({
        title: '로그인 필요',
        content: (
          <div>
            <span>로그인 후에 북마크기능을 사용하실 수 있습니다.</span>
            <p>로그인 페이지로 이동하시겠습니까?</p>
          </div>
        ),
        onOk: () => {
          navigate('/login');
        }
      });
      return;
    }

    if (isBookmarked) {
      const alreadyBookmarkedUser = post?.bookmarks.find(
        (bookmark) => bookmark.userId === viewer.id
      );
      if (alreadyBookmarkedUser) {
        removeBookmark(alreadyBookmarkedUser.id);
        setBookmarked(false);
        message.info('북마크가 취소되었습니다.');
      }
      return;
    }
    addBookmark({ userId: viewer.id });
    setBookmarked(true);
    message.info('내 북마크에 추가되었습니다.');
  };

  return (
    <List.Item>
      <Badge.Ribbon
        text={post?.category}
        style={getStyleByCategory(post?.category as CategoryType)}
      >
        <Card
          title={post?.title}
          hoverable
          onClick={onPostCardClickHandler}
          headStyle={{ backgroundColor: '#fff' }}
          cover={
            <div
              style={{
                backgroundImage: `url(${post?.thumbnail_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 'inherit',
                height: '400px',
                position: 'relative'
              }}
            ></div>
          }
        >
          <StBookmarkButton onClick={handleClickBookmark}>
            {isBookmarked ? <StBookmark /> : <StDisBookmark />}
          </StBookmarkButton>
          <Meta
            title={user?.nickname!}
            avatar={
              <Avatar
                size={64}
                src={
                  <img
                    src={user?.avatar_url}
                    alt={user?.nickname}
                    style={{ backgroundColor: '#eee' }}
                  />
                }
              />
            }
            description={post?.summary}
          />
          <Badge count={`${post?.likes?.length} Likes`} showZero />
        </Card>
      </Badge.Ribbon>
    </List.Item>
  );
};
export const getStyleByCategory = (category: CategoryType) => {
  const style = {
    fontWeight: '700',
    color: '#fff'
  };
  switch (category) {
    case 'REACT':
      return { ...style, backgroundColor: '#54b4fd' };
    case 'NODE':
      return { ...style, backgroundColor: '#31a431' };
    case 'AI':
      return { ...style, backgroundColor: '#40a0ee' };
    case 'ANDROID':
      return { ...style, backgroundColor: '#40ee40' };
    case 'IOS':
      return { ...style, backgroundColor: '#04080a' };
    case 'SPRING':
      return { ...style, backgroundColor: '#f6ff00', color: '#000' };
    case 'UI/UX':
      return { ...style, backgroundColor: '#6443d0' };
    case 'UNITY':
      return { ...style, backgroundColor: '#0e2230' };
    default:
      break;
  }
};

export default Post;

const StBookmarkButton = styled.button`
  position: absolute;
  width: fit-content;
  bottom: 90px;
  right: 10px;
  border: none;
  background-color: #ffffff00;
`;

const StBookmark = styled(FaRegBookmark)`
  font-size: 35px;
  cursor: pointer;
  color: #6c2dc7;
  transition: color 0.3s ease;
  &:hover {
    color: #8e44ad;
    transform: scale(1.05);
  }
`;

const StDisBookmark = styled(FaBookmark)`
  font-size: 35px;
  cursor: pointer;
  color: #6c2dc7;
  transition: color 0.3s ease;
  &:hover {
    color: #8e44ad;
    transform: scale(1.05);
  }
`;
