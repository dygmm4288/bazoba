import { useState } from 'react';
import {
  useQueryComment,
  useUpdateComment,
  useRemoveComment
} from '../../hooks/query/useSupabase';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/auth';
import { useQueryUser } from '../../hooks/query/useSupabase';

import type { CommentType } from '../../supabase/supabase.types';

interface DetailCommentProps {
  id: string;
}

function DetailComment({ id }: DetailCommentProps) {
  const { comments } = useQueryComment(id);
  const { updateComment } = useUpdateComment(id);
  const { removeComment } = useRemoveComment(id);

  const [editedComments, setEditedComments] = useState<Record<string, string>>(
    {}
  );

  const userLoginState = useRecoilValue(loginState);

  const userId = userLoginState ? userLoginState.id : '';

  const user = useQueryUser(userId)?.user;

  const handleDelete = (commentId: string) => {
    removeComment(commentId);
  };

  const handleEdit = (commentId: string) => {
    const editedComment = editedComments[commentId];
    if (editedComment && user) {
      updateComment({
        id: commentId,
        content: editedComment,
        type: 0,
        userId: user.id
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
                <button onClick={() => handleDelete(comment.id)}>삭제</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DetailComment;
