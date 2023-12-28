import { useState } from 'react';
import { useAddComment } from '../../hooks/useSupabase';
import { NewCommentType } from '../../supabase';

function DetailFormComment() {
  const [commentContent, setCommentContent] = useState('');
  const { addComment } = useAddComment('a38a1eb0-e793-472b-9f9a-f5dbd608afa8');

  const handleAddComment = () => {
    if (commentContent.trim() !== '') {
      const newComment: NewCommentType = {
        content: commentContent,
        type: 0,
        userId: 'leejinho'
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
