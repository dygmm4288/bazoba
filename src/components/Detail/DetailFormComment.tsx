import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAddComment, useQueryUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';

import type { TablesInsert } from '../../supabase/supabaseSchema.types';

interface DetailFormContentProps {
  id: string;
}

function DetailFormComment({ id }: DetailFormContentProps) {
  const [commentContent, setCommentContent] = useState('');
  const [commentType, setCommentType] = useState('0');
  const { addComment } = useAddComment(id);

  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState ? userLoginState.id : '';
  const { user } = useQueryUser(userId);

  const handleAddComment = () => {
    if (commentContent.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    if (!user) {
      alert('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    const newComment: Omit<TablesInsert<'comments'>, 'postId'> = {
      content: commentContent,
      type: parseInt(commentType),
      userId: user.id,
      nickname: user.nickname
    };

    addComment(newComment);
    setCommentContent('');
    setCommentType('0');
  };

  const isDisabled = !userLoginState;

  return (
    <div>
      <h2>댓글 작성하기</h2>
      <textarea
        rows={4}
        cols={50}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder={
          '내용을 입력해 주세요.\n댓글을 입력하려면 로그인해 주세요.'
        }
        disabled={isDisabled}
      />
      <br />
      <label htmlFor="commentType">댓글 유형 선택: </label>
      <select
        id="commentType"
        value={commentType}
        onChange={(e) => setCommentType(e.target.value)}
        disabled={isDisabled}
      >
        <option value="0">댓글</option>
        <option value="1">코멘트 리뷰</option>
      </select>
      <br />
      <button onClick={handleAddComment} disabled={isDisabled}>
        댓글 등록
      </button>
    </div>
  );
}

export default DetailFormComment;
