import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  useQueryComment,
  useQueryUser,
  useRemoveComment,
  useUpdateComment
} from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';

import { assoc, dissoc } from 'ramda';

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
  const userId = userLoginState?.id || '';
  const user = useQueryUser(userId)?.user;

  const handleDelete = (commentId: string) => {
    const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');

    if (confirmDelete) {
      removeComment(commentId);
    }
  };

  const handleEdit = (commentId: string) => {
    if (comments && comments.length > 0) {
      const comment = comments.find((comment) => comment.id === commentId);
      const editedComment = editedComments[commentId];
      const isCanEdit = comment && user && editedComment;

      if (isCanEdit) {
        if (comment.content === editedComment) {
          alert('수정된 내용이 없습니다.');
          return;
        }

        const confirmToSave = window.confirm('변경된 내용을 저장하시겠습니까?');
        if (!confirmToSave) return;

        updateComment({
          id: commentId,
          content: editedComment,
          type: comment.type,
          userId: user.id
        });

        setEditedComments(deleteComment(commentId));
      }
    }
  };

  const handleCancel = (commentId: string) => {
    setEditedComments(deleteComment(commentId));
  };

  const handleInputChange = (commentId: string, content: string) => {
    setEditedComments(addComment(commentId, content));
  };

  return (
    <div>
      <h2>댓글</h2>
      {comments
        ?.filter((comment) => comment.type === 0)
        .map((comment) => {
          const { id: commentId, userId: commentUserId, content } = comment;
          const { avatar_url, nickname } = comment.users!;

          const isEdited = !!editedComments[commentId];
          const isOwner = commentUserId === userId;

          return (
            <div key={commentId}>
              <img src={avatar_url} alt="Avatar" />
              <p>Nickname: {nickname}</p>
              {isEdited ? (
                <div>
                  <input
                    type="text"
                    value={editedComments[commentId] || ''}
                    onChange={(e) =>
                      handleInputChange(commentId, e.target.value)
                    }
                  />
                  <button onClick={() => handleEdit(commentId)}>저장</button>
                  <button onClick={() => handleCancel(commentId)}>취소</button>
                </div>
              ) : (
                <div>
                  <p>Content: {content}</p>
                  {isOwner && (
                    <>
                      <button
                        onClick={() => handleInputChange(commentId, content)}
                      >
                        수정
                      </button>
                      <button onClick={() => handleDelete(commentId)}>
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
const deleteComment =
  (commentId: string) => (comments: Record<string, string>) =>
    dissoc(commentId, comments);
const addComment =
  (commentId: string, content: string) => (comments: Record<string, string>) =>
    assoc(commentId, content, comments);
export default DetailComment;
