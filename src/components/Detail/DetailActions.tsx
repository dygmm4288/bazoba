import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  useAddBookmark,
  useAddLike,
  useQueryPost,
  useQueryUser,
  useRemoveBookmark,
  useRemoveLike
} from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';

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

  // ? : 서버에서 모든 데이터를 가져오는 것이 아닌 데이터는 필요한 부분만 가져오고 (여기에서는 좋아요, 북마크 카운트.) 현재 유저가 좋아요를 눌렀는지, 북마크를 눌렀는지도 서버에서 확인하는 것이 낫지 않나?
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
      }
      return;
    }
    addLike({ userId: user.id });
    setLiked(true);
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
      }
      return;
    }
    addBookmark({ userId: user.id });
    setBookmarked(true);
  };

  return (
    <div>
      <button onClick={handleClickLike} disabled={!isLogin}>
        {isLiked ? '좋아요 취소' : '좋아요'}
      </button>
      {!isLogin && <span>로그인 후에 좋아요를 누르실 수 있습니다.</span>}

      <button onClick={handleClickBookmark} disabled={!isLogin}>
        {isBookmarked ? '북마크 취소' : '북마크 추가'}
      </button>
      {!isLogin && <span>로그인 후에 북마크를 사용 할 수 있습니다.</span>}
    </div>
  );
}
export default DetailActions;
