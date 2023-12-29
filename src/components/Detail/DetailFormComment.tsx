import { useState } from 'react';
import { useAddComment } from '../../hooks/query/useSupabase';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/auth';
import { useQueryUser } from '../../hooks/query/useSupabase';

import type { TablesInsert } from '../../supabase/supabaseSchema.types';

interface DetailFormContentProps {
  id: string;
}

function DetailFormComment({ id }: DetailFormContentProps) {
  const [commentContent, setCommentContent] = useState('');
  const { addComment } = useAddComment(id);

  const userLoginState = useRecoilValue(loginState);

  const userId = userLoginState ? userLoginState.id : '';

  const { user } = useQueryUser(userId);

  const handleAddComment = () => {
    if (commentContent.trim() !== '' && user) {
      const newComment: Omit<TablesInsert<'comments'>, 'postId'> = {
        content: commentContent,
        type: 0,
        userId: user.id
      };
      addComment(newComment);
      setCommentContent('');
    }
  };

  return (
    <div>
      <h2>댓글 작성하기</h2>
      <textarea
        rows={4}
        cols={50}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="내용을 입력해 주세요"
      />
      <br />
      <button onClick={handleAddComment}>댓글 등록</button>
    </div>
  );
}

export default DetailFormComment;
