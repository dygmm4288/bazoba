import React, { useState } from 'react';
import { useAddComment } from '../../hooks/useSupabase';

import type { CommentType } from '../../supabase/supabase.types';

function DetailFormComment() {
  const [commentContent, setCommentContent] = useState('');
  const { addComment } = useAddComment('a38a1eb0-e793-472b-9f9a-f5dbd608afa8');

  const handleAddComment = () => {
    if (commentContent.trim() !== '') {
      const newComment: CommentType = {
        id: '',
        content: commentContent,
        postId: 'a38a1eb0-e793-472b-9f9a-f5dbd608afa8'
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
        placeholder="Type your comment here..."
      />
      <br />
      <button onClick={handleAddComment}>댓글 등록</button>
    </div>
  );
}

export default DetailFormComment;
