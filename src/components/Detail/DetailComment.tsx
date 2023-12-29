import { useState } from 'react';
import {
  useQueryComment,
  useUpdateComment
} from '../../hooks/query/useSupabase';

import type { CommentType } from '../../supabase/supabase.types';

function DetailComment() {
  const { comments } = useQueryComment('a38a1eb0-e793-472b-9f9a-f5dbd608afa8');
  const { updateComment } = useUpdateComment(
    'a38a1eb0-e793-472b-9f9a-f5dbd608afa8'
  );

  const [editedComments, setEditedComments] = useState<Record<string, string>>(
    {}
  );

  const handleEdit = (commentId: string) => {
    const editedComment = editedComments[commentId];
    if (editedComment) {
      updateComment({
        id: commentId,
        content: editedComment,
        type: 0,
        userId: '123'
      });
      setEditedComments((prevComments) => {
        const { [commentId]: deletedKey, ...rest } = prevComments;
        return rest;
      });
    }
  };

  const handleCancel = (commentId: string) => {
    setEditedComments((prevComments) => {
      const { [commentId]: deletedKey, ...rest } = prevComments;
      return rest;
    });
  };

  const handleInputChange = (commentId: string, content: string) => {
    setEditedComments((prevComments) => ({
      ...prevComments,
      [commentId]: content
    }));
  };

  return (
    <div>
      <h2>댓글</h2>
      {comments?.map((comment: CommentType) => {
        const isEdited = !!editedComments[comment.id];
        return (
          <div key={comment.id}>
            <p>User ID: {comment.userId}</p>
            {isEdited ? (
              <div>
                <input
                  type="text"
                  value={editedComments[comment.id] || ''}
                  onChange={(e) =>
                    handleInputChange(comment.id, e.target.value)
                  }
                />
                <button onClick={() => handleEdit(comment.id)}>저장</button>
                <button onClick={() => handleCancel(comment.id)}>취소</button>
              </div>
            ) : (
              <div>
                <p>Content: {comment.content}</p>
                <button
                  onClick={() => handleInputChange(comment.id, comment.content)}
                >
                  수정
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DetailComment;
