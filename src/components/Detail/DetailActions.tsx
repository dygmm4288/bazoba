import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  useAddBookmark,
  useAddLike,
  useQueryPost,
  useQueryUser,
  useRemoveBookmark,
  useRemoveLike,
  useRemovePost
} from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import styled from 'styled-components';

interface DetailActionsProps {
  id: string;
}

function DetailActions({ id }: DetailActionsProps) {
  const { post } = useQueryPost(id);
  const { removePost } = useRemovePost(id);
  const { addLike } = useAddLike(id);
  const { removeLike } = useRemoveLike(id);
  const { addBookmark } = useAddBookmark(id);
  const { removeBookmark } = useRemoveBookmark(id);

  const navigate = useNavigate();

  const [isLiked, setLiked] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);

  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState?.id || '';
  const { user } = useQueryUser(userId);
  const isLogin = !!userLoginState;

  useEffect(() => {
    if (post?.likes && user) {
      const userLiked = post.likes.some((like) => like.userId === user.id);
      setLiked(userLiked);
    }

    if (post?.bookmarks && user) {
      const userBookmarked = post.bookmarks.some(
        (bookmark) => bookmark.userId === user.id
      );
      setBookmarked(userBookmarked);
    }
  }, [post?.likes, post?.bookmarks, user]);

  const handleClickLike = () => {
    if (!user) {
      Modal.confirm({
        title: '로그인 필요',
        content: (
          <div>
            <span>로그인 후에 좋아요를 누르실 수 있습니다.</span>
            <p>로그인 페이지로 이동하시겠습니까?</p>
          </div>
        ),
        onOk: () => {
          navigate('/login');
        }
      });
      return;
    }

    if (isLiked) {
      const alreadyLikedUser = post?.likes.find(
        (like) => like.userId === user.id
      );
      if (alreadyLikedUser) {
        removeLike(alreadyLikedUser.id);
        setLiked(false);
        message.info('좋아요가 취소되었습니다.');
      }
      return;
    }
    addLike({ userId: user.id });
    setLiked(true);
    message.info('좋아요!');
  };

  const handleClickBookmark = () => {
    if (!user) {
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
        (bookmark) => bookmark.userId === user.id
      );
      if (alreadyBookmarkedUser) {
        removeBookmark(alreadyBookmarkedUser.id);
        setBookmarked(false);
        message.info('북마크가 취소되었습니다.');
      }
      return;
    }
    addBookmark({ userId: user.id });
    setBookmarked(true);
    message.info('내 북마크에 추가되었습니다.');
  };

  const handleDeletePost = () => {
    if (user && post && user.id === post.author) {
      const confirmDelete = window.confirm(
        '정말 이 게시물을 삭제하시겠습니까?'
      );
      if (confirmDelete) {
        removePost(id);
      }
    } else {
      alert('삭제할 수 있는 권한이 없습니다.');
    }
  };

  const handleNavigateToEditor = (id: string) => {
    navigate(`/write/${id}`);
  };

  return (
    <ActionButtonsContainer>
      <div>
        {user && post && user.id === post.author && (
          <PostEditButton onClick={() => handleNavigateToEditor(id)}>
            수정하기
          </PostEditButton>
        )}
        {user && post && user.id === post.author && (
          <PostDeleteButton
            onClick={handleDeletePost}
            disabled={!userLoginState}
          >
            게시물 삭제
          </PostDeleteButton>
        )}
      </div>
      <ButtonSection>
        <StLikeButton onClick={handleClickLike}>
          {isLiked ? <StHeartDislike /> : <StHeartLike />}
        </StLikeButton>

        <StBookmarkButton onClick={handleClickBookmark}>
          {isBookmarked ? <StDisBookmark /> : <StBookmark />}
        </StBookmarkButton>
      </ButtonSection>
    </ActionButtonsContainer>
  );
}

export default DetailActions;

const StLikeButton = styled.button`
  border: none;
`;

const StHeartDislike = styled(FaHeart)`
  font-size: 35px;
  cursor: pointer;
  color: #f70d1a;
  transition: color 0.3s ease;
  &:hover {
    color: #ff5c62;
    transform: scale(1.05);
  }
`;

const StHeartLike = styled(FaRegHeart)`
  font-size: 35px;
  cursor: pointer;
  color: #f70d1a;
  transition: color 0.3s ease;
  &:hover {
    color: #ff5c62;
    transform: scale(1.05);
  }
`;

const StBookmarkButton = styled.button`
  border: none;
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

const ButtonSection = styled.div`
  button {
    background-color: #fff;
  }
`;

const PostDeleteButton = styled.button`
  border: none;
  background-color: #ff4d4f;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #ff6666;
    transform: scale(1.05);
  }
`;
const PostEditButton = styled.button`
  border: none;
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #45aaf2;
    transform: scale(1.05);
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 100%;
`;
