import { useState } from 'react';
import { addComment } from '../../supabase/supabase.types';

const DetailFormComment = () => {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }

    const newComment = {
      content: comment
    };

    addComment('postId', newComment);
    setComment('');
  };

  return (
    <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력해 주세요"
      />
      <button onClick={handleAddComment}>댓글 추가</button>
    </div>
  );
};

export default DetailFormComment;
