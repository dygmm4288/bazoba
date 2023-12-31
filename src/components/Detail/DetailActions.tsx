import React, { useState, useEffect } from 'react';
import {
  useAddLike,
  useRemoveLike,
  useAddBookmark,
  useRemoveBookmark
} from '../../hooks/query/useSupabase';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/auth';
import { useQueryUser, useQueryPost } from '../../hooks/query/useSupabase';
import { IoIosHeart, IoIosHeartDislike } from 'react-icons/io';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { message } from 'antd';

interface DetailActionsProps {
  id: string;
}

function DetailActions({ id }: DetailActionsProps) {
  const { post } = useQueryPost(id);
  const { addLike } = useAddLike(id);
  const { removeLike } = useRemoveLike(id);
  const { addBookmark } = useAddBookmark(id);
  const { removeBookmark } = useRemoveBookmark(id);

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
      // TODO : 로그인 페이지로 이동하겠냐는 메시지가 있으면 좋겠다.
      alert('사용자가 로그인되지 않았습니다.');
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
      // TODO : 로그인 페이지로 이동하겠냐는 메시지가 있으면 좋겠다.
      alert('사용자가 로그인되지 않았습니다.');
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

  return (
    <ActionButtonsContainer>
      <StLikeButton onClick={handleClickLike} disabled={!userLoginState}>
        {isLiked ? <StHeartDislike /> : <StHeartLike />}
      </StLikeButton>
      {!userLoginState && <span>로그인 후에 좋아요를 누르실 수 있습니다.</span>}

      <StBookmarkButton
        onClick={handleClickBookmark}
        disabled={!userLoginState}
      >
        {isBookmarked ? <StDisBookmark /> : <StBookmark />}
      </StBookmarkButton>
      {!userLoginState && (
        <span>로그인 후에 북마크를 사용 할 수 있습니다.</span>
      )}
    </ActionButtonsContainer>
  );
}
export default DetailActions;

const StLikeButton = styled.button`
  border: none;
`;

const StHeartDislike = styled(IoIosHeartDislike)`
  font-size: 40px;
  cursor: pointer;
  color: #f70d1a;
`;

const StHeartLike = styled(IoIosHeart)`
  font-size: 40px;
  cursor: pointer;
  color: #f70d1a;
`;

const StBookmarkButton = styled.button`
  border: none;
`;

const StBookmark = styled(FaRegBookmark)`
  font-size: 30px;
  cursor: pointer;
  color: #6c2dc7;
`;

const StDisBookmark = styled(FaBookmark)`
  font-size: 30px;
  cursor: pointer;
  color: #6c2dc7;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;
