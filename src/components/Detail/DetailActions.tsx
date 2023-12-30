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

interface DetailActionsProps {
  id: string;
}

function DetailActions({ id }: DetailActionsProps) {
  const { post } = useQueryPost(id);
  const { addLike } = useAddLike(id);
  const { removeLike } = useRemoveLike(id);
  const { addBookmark } = useAddBookmark(id);
  const { removeBookmark } = useRemoveBookmark(id);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState ? userLoginState.id : '';
  const { user } = useQueryUser(userId);

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

  const handleLikeAction = () => {
    if (!user) {
      alert('사용자가 로그인되지 않았습니다.');
      return;
    }

    if (liked) {
      const userLike = post?.likes.find((like) => like.userId === user.id);
      if (userLike) {
        removeLike(userLike.id);
        setLiked(false);
      }
    } else {
      const newLike = {
        userId: user.id
      };
      addLike(newLike);
      setLiked(true);
    }
  };

  const handleBookmarkAction = () => {
    if (!user) {
      alert('사용자가 로그인되지 않았습니다.');
      return;
    }

    if (bookmarked) {
      const userBookmark = post?.bookmarks.find(
        (bookmark) => bookmark.userId === user.id
      );
      if (userBookmark) {
        removeBookmark(userBookmark.id);
        setBookmarked(false);
      }
    } else {
      const newBookmark = {
        userId: user.id
      };
      addBookmark(newBookmark);
      setBookmarked(true);
    }
  };

  return (
    <div>
      <button onClick={handleLikeAction} disabled={!userLoginState}>
        {liked ? '좋아요 취소' : '좋아요'}
      </button>
      {!userLoginState && <span>로그인 후에 좋아요를 누르실 수 있습니다.</span>}

      <button onClick={handleBookmarkAction} disabled={!userLoginState}>
        {bookmarked ? '북마크 취소' : '북마크 추가'}
      </button>
      {!userLoginState && (
        <span>로그인 후에 북마크를 사용 할 수 있습니다.</span>
      )}
    </div>
  );
}
export default DetailActions;
