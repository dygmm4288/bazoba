import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { db } from '../../supabase';
import { useQueryUser, useUpdateUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TablesUpdate } from '../../supabase/supabaseSchema.types';
import AvatarForm from './AvatarForm';

function Profile() {
  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id ? loginUser.id : '';
  const { user } = useQueryUser(userId);
  const { updateUser } = useUpdateUser(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname);

  const handleLogout = async () => {
    const { error } = await db.auth.signOut();
    console.log(error);
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleCancleEdit = () => {
    setNickname(user?.nickname);
    setIsEditing(false);
  };

  const handleCompleteButton = () => {
    if (user && nickname?.trim() === user?.nickname) {
      message.info('수정내용이 없습니다');
      setIsEditing(false);
      return;
    }
    const newUser: TablesUpdate<'users'> = {
      id: userId,
      nickname
    };
    updateUser(newUser);
    message.info('수정 완료!');
    setIsEditing(false);
  };

  return (
    <StProfileWrapper>
      <StProfileBackGround></StProfileBackGround>
      <StProfileDiv>
        <AvatarForm />
        <StProfileText>
          {!isEditing && <h1>{nickname}</h1>}
          {isEditing && (
            <Input
              size="large"
              defaultValue={nickname}
              onChange={(e) => setNickname(e.target.value)}
              count={{
                show: true,
                max: 10
              }}
              maxLength={10}
            />
          )}
          <p>{user?.email}</p>
        </StProfileText>
        <StProfileButtons>
          {!isEditing && (
            <>
              <Button onClick={handleEditButton}>닉네임 수정</Button>
              <Button danger onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          )}
          {isEditing && (
            <>
              <Button onClick={handleCancleEdit}>수정 취소</Button>
              <Button type="primary" onClick={handleCompleteButton}>
                수정 완료
              </Button>
            </>
          )}
        </StProfileButtons>
      </StProfileDiv>
    </StProfileWrapper>
  );
}

export default Profile;

const StProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  background-color: white;
  //position: relative;
`;

const StProfileBackGround = styled.div`
  height: 200px;
  background-color: #2d18a0;
`;
const StProfileDiv = styled.div`
  height: 150px;
  display: flex;
  flex-direction: row;
`;

const StProfileText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  width: 400px;
`;

const StProfileButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 200px;
  button {
    margin-right: 10px;
  }
`;
