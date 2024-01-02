import { message } from 'antd';
import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { IoIosHeart, IoIosHeartDislike } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
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
import { addNotification } from '../../supabase';
import { TablesInsert } from '../../supabase/supabaseSchema.types';

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

    const newNotification: TablesInsert<'notifications'> = {
      actionUserNickname: user.nickname,
      recipientUserId: post?.author!,
      type: 'like',
      postId: post?.id
    };

    addLike({ userId: user.id });
    addNotification(newNotification);
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
      <PostEditDeleteWrapper>
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
      </PostEditDeleteWrapper>
      <div>
        <StLikeButton onClick={handleClickLike} disabled={!userLoginState}>
          {isLiked ? <StHeartDislike /> : <StHeartLike />}
        </StLikeButton>
        {!userLoginState && (
          <span>로그인 후에 좋아요를 누르실 수 있습니다.</span>
        )}

        <StBookmarkButton
          onClick={handleClickBookmark}
          disabled={!userLoginState}
        >
          {isBookmarked ? <StDisBookmark /> : <StBookmark />}
        </StBookmarkButton>
        {!userLoginState && (
          <span>로그인 후에 북마크를 사용 할 수 있습니다.</span>
        )}
      </div>
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
  transition: color 0.3s ease;
  &:hover {
    color: #ff5c62;
    transform: scale(1.05);
  }
`;

const StHeartLike = styled(IoIosHeart)`
  font-size: 40px;
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

const PostEditDeleteWrapper = styled.div``;

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
