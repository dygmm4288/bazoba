import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  useQueryComment,
  useQueryPost,
  useQueryUser,
  useRemoveComment,
  useUpdateComment
} from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';

import { assoc, dissoc } from 'ramda';
import type { CommentType } from '../../supabase/supabase.types';

interface DetailReviewCommentProps {
  id: string;
}

function DetailReviewComment({ id }: DetailReviewCommentProps) {
  const { post } = useQueryPost(id);
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
      {(post?.author === user?.id ||
        comments?.some((comment) => comment.userId === user?.id)) && (
        <div>
          <h2>코멘트 리뷰</h2>
          {comments
            ?.filter((comment: CommentType) => comment.type === 1)
            .map((comment: CommentType) => {
              const isEdited = !!editedComments[comment.id];
              const isOwner = comment.userId === userId;
              return (
                <div key={comment.id}>
                  <img src={comment.avatar_url} alt="Avatar" />
                  <p>Nickname: {comment.nickname}</p>
                  {isEdited ? (
                    <div>
                      <input
                        type="text"
                        value={editedComments[comment.id] || ''}
                        onChange={(e) =>
                          handleInputChange(comment.id, e.target.value)
                        }
                      />
                      <button onClick={() => handleEdit(comment.id)}>
                        저장
                      </button>
                      <button onClick={() => handleCancel(comment.id)}>
                        취소
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>Content: {comment.content}</p>
                      {isOwner && (
                        <div>
                          <button
                            onClick={() =>
                              handleInputChange(comment.id, comment.content)
                            }
                          >
                            수정
                          </button>
                          <button onClick={() => handleDelete(comment.id)}>
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
const deleteComment =
  (commentId: string) => (comments: Record<string, string>) =>
    dissoc(commentId, comments);
const addComment =
  (commentId: string, content: string) => (comments: Record<string, string>) =>
    assoc(commentId, content, comments);

export default DetailReviewComment;
