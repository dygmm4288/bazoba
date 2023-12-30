import { useState } from 'react';
import {
  useQueryComment,
  useUpdateComment,
  useRemoveComment,
  useQueryUser,
  useQueryPost
} from '../../hooks/query/useSupabase';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/auth';

import type { CommentType } from '../../supabase/supabase.types';

interface DetailCommentProps {
  id: string;
}

function DetailComment({ id }: DetailCommentProps) {
  const { post } = useQueryPost(id);
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
    const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');

    if (confirmDelete) {
      removeComment(commentId);
    } else {
    }
  };

  const handleEdit = (commentId: string) => {
    const editedComment = editedComments[commentId];

    if (comments && comments.length > 0) {
      const commentToUpdate = comments.find(
        (comment) => comment.id === commentId
      );

      if (editedComment && user && commentToUpdate) {
        if (editedComment !== commentToUpdate.content) {
          const confirmSave = window.confirm('변경된 내용을 저장하시겠습니까?');

          if (confirmSave) {
            updateComment({
              id: commentId,
              content: editedComment,
              type: commentToUpdate.type,
              userId: user.id
            });
            setEditedComments((prevComments) => {
              const { [commentId]: deletedKey, ...rest } = prevComments;
              return rest;
            });
          } else {
          }
        } else {
          alert('수정된 내용이 없습니다.');
        }
      }
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
      <div>
        <h2>댓글</h2>
        {comments
          ?.filter((comment: CommentType) => comment.type === 0)
          .map((comment: CommentType) => {
            const isEdited = !!editedComments[comment.id];
            const isOwner = comment.userId === userId;
            return (
              <div key={comment.id}>
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
                    <button onClick={() => handleEdit(comment.id)}>저장</button>
                    <button onClick={() => handleCancel(comment.id)}>
                      취소
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Content: {comment.content}</p>
                    {isOwner && (
                      <>
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
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>

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
                        <>
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
                        </>
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
export default DetailComment;
