import { Flex, Input } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  useAddComment,
  useQueryPost,
  useQueryUser
} from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';

import { addNotification } from '../../supabase';
import type { TablesInsert } from '../../supabase/supabaseSchema.types';

interface DetailFormContentProps {
  id: string;
}

function DetailFormComment({ id }: DetailFormContentProps) {
  const [commentContent, setCommentContent] = useState('');
  const [commentType, setCommentType] = useState('0');
  const { addComment } = useAddComment(id);
  const { post } = useQueryPost(id);

  const userLoginState = useRecoilValue(loginState);
  const userId = userLoginState?.id || '';
  const { user } = useQueryUser(userId);

  const { TextArea } = Input;

  const handleAddComment = () => {
    if (commentContent.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    if (!user) {
      alert('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    const newComment: Omit<TablesInsert<'comments'>, 'postId'> = {
      content: commentContent,
      type: parseInt(commentType),
      userId: user.id,
      nickname: user.nickname,
      avatar_url: user.avatar_url
    };
    const newNotification: TablesInsert<'notifications'> = {
      actionUserNickname: user.nickname,
      recipientUserId: post?.author!,
      type: commentType === '0' ? 'comment' : 'review',
      postId: post?.id
    };

    addComment(newComment);
    addNotification(newNotification);
    setCommentContent('');
    setCommentType('0');
  };

  const isDisabled = !userLoginState;

  return (
    <CommentFormContainer>
      <h2>댓글 작성하기</h2>
      <Flex vertical gap={32}>
        <TextArea
          showCount
          rows={4}
          value={commentContent}
          maxLength={100}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder={
            '내용을 입력해 주세요.\n댓글을 입력하려면 로그인해 주세요.'
          }
          disabled={isDisabled}
        />
      </Flex>
      <br />
      <CommentFormControlsContainer>
        <div>
          <CommentTypeLabel htmlFor="commentType">
            댓글 유형 선택:{' '}
          </CommentTypeLabel>
          <CommentTypeSelect
            id="commentType"
            value={commentType}
            onChange={(e) => setCommentType(e.target.value)}
            disabled={isDisabled}
          >
            <option value="0">댓글</option>
            <option value="1">코멘트 리뷰</option>
          </CommentTypeSelect>
        </div>
        <CommentSubmitButton onClick={handleAddComment} disabled={isDisabled}>
          댓글 등록
        </CommentSubmitButton>
      </CommentFormControlsContainer>
    </CommentFormContainer>
  );
}

export default DetailFormComment;

const CommentFormContainer = styled.div`
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const CommentTypeSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
`;

const CommentSubmitButton = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  background-color: #5f85bb;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #436094;
    transform: scale(1.05);
  }
`;

const CommentFormControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const CommentTypeLabel = styled.label`
  font-weight: bold;
  font-size: 20px;
`;
