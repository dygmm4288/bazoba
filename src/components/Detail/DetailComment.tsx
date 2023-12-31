import { Flex, Input, Modal } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
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
  const [editedModes, setEditedModes] = useState<Record<string, boolean>>(
    comments?.reduce((acc, comment) => ({ ...acc, [comment.id]: false }), {}) ||
      {}
  );

  const { TextArea } = Input;

  const generalComments =
    comments?.filter((comment) => comment.type === 0) || [];

  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState?.id || '';
  const user = useQueryUser(userId)?.user;

  const handleDelete = (commentId: string) => {
    Modal.confirm({
      title: '알림',
      content: '정말로 이 댓글을 삭제하시겠습니까?',
      onOk() {
        removeComment(commentId);
      }
    });
  };

  const handleEdit = (commentId: string) => {
    const comment = comments?.find((comment) => comment.id === commentId);
    const editedComment = editedComments[commentId];
    const isCanEdit = comment && user;

    if (isCanEdit) {
      if (!editedComment.trim()) {
        Modal.info({
          title: '알림',
          content: '수정할 내용을 입력해주세요.'
        });
        return;
      }

      if (comment.content === editedComment) {
        Modal.info({
          title: '알림',
          content: '수정된 내용이 없습니다.'
        });
        return;
      }

      Modal.confirm({
        title: '알림',
        content: '이대로 변경된 내용을 저장하시겠습니까?',
        onOk() {
          updateComment({
            id: commentId,
            content: editedComment,
            type: comment.type,
            userId: user.id
          });

          setEditedComments(deleteComment(commentId));
          setEditedModes(assoc(commentId, false));
        }
      });
    }
  };

  const handleCancel = (commentId: string) => {
    setEditedComments(deleteComment(commentId));
    setEditedModes(assoc(commentId, false));
  };

  const handleInputChange = (commentId: string, content: string) => {
    setEditedComments(addComment(commentId, content));
    setEditedModes(assoc(commentId, true));
  };

  return (
    <Container>
      <CommentTitle>
        {generalComments.length === 0
          ? '등록된 댓글이 없습니다.'
          : `댓글 ${generalComments.length}개`}
      </CommentTitle>
      {comments
        ?.filter((comment) => comment.type === 0)
        .map((comment) => {
          const { id: commentId, userId: commentUserId, content } = comment;
          const { avatar_url, nickname } = comment.users!;

          const isEdited = !!editedModes[commentId];
          const isOwner = commentUserId === userId;

          return (
            <CommentContainer key={commentId}>
              <CommentContent>
                <Avatar src={avatar_url} alt="Avatar" />
                <CommentInfo>
                  <NicknameText>{nickname}</NicknameText>
                  {isEdited ? (
                    <div>
                      <Flex vertical gap={32}>
                        <TextArea
                          showCount
                          rows={4}
                          maxLength={100}
                          value={editedComments[comment.id] || ''}
                          onChange={(e) =>
                            handleInputChange(comment.id, e.target.value)
                          }
                        />
                      </Flex>
                      <ActionButtonsContainer>
                        <EditButton onClick={() => handleEdit(commentId)}>
                          저장
                        </EditButton>
                        <DeleteButton onClick={() => handleCancel(commentId)}>
                          취소
                        </DeleteButton>
                      </ActionButtonsContainer>
                    </div>
                  ) : (
                    <div>
                      <ContentText>{content}</ContentText>
                      {isOwner && (
                        <ActionButtonsContainer>
                          <EditButton
                            onClick={() =>
                              handleInputChange(commentId, content)
                            }
                          >
                            수정
                          </EditButton>
                          <DeleteButton onClick={() => handleDelete(commentId)}>
                            삭제
                          </DeleteButton>
                        </ActionButtonsContainer>
                      )}
                    </div>
                  )}
                </CommentInfo>
              </CommentContent>
            </CommentContainer>
          );
        })}
    </Container>
  );
}
const deleteComment =
  (commentId: string) => (comments: Record<string, string>) =>
    dissoc(commentId, comments);
const addComment =
  (commentId: string, content: string) => (comments: Record<string, string>) =>
    assoc(commentId, content, comments);
export default DetailComment;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CommentContainer = styled.div`
  margin-bottom: 20px;
`;

const CommentTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 48px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  padding: 3px;
  margin: 10px;
  border: 2px solid #134f2c;
`;

const NicknameText = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const ContentText = styled.p`
  font-size: 15px;
  margin-left: 5px;
  word-wrap: break-word;
  word-break: break-all;
  max-width: 600px;
`;

const CommentContent = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid #134f2c;
`;

const CommentInfo = styled.div`
  width: 100%;
`;

const ActionButtonsContainer = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const EditButton = styled.button`
  border: none;
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #45aaf2;
    transform: scale(1.05);
  }
`;

const DeleteButton = styled.button`
  border: none;
  background-color: #ff4d4f;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #ff6666;
    transform: scale(1.05);
  }
`;
