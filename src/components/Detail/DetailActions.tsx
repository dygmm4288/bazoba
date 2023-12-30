import React, { useState, useEffect } from 'react';
import { useAddLike, useRemoveLike } from '../../hooks/query/useSupabase';
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

  const [liked, setLiked] = useState(false);
  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState ? userLoginState.id : '';
  const { user } = useQueryUser(userId);

  useEffect(() => {
    if (post?.likes && user) {
      const userLiked = post.likes.some((like) => like.userId === user.id);
      setLiked(userLiked);
    }
  }, [post?.likes, user]);

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

  return (
    <div>
      <button onClick={handleLikeAction} disabled={!userLoginState}>
        {liked ? '좋아요 취소' : '좋아요'}
      </button>
      {!userLoginState && <span>로그인 후에 좋아요를 누르실 수 있습니다.</span>}
    </div>
  );
}

export default DetailActions;
