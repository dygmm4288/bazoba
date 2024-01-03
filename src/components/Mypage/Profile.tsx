import { Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryUser, useUpdateUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { db } from '../../supabase';
import { TablesUpdate } from '../../supabase/supabaseSchema.types';
import AvatarForm from './AvatarForm';

function Profile() {
  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id ? loginUser.id : '';
  const { user } = useQueryUser(userId);
  const { updateUser } = useUpdateUser(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname);

  useEffect(() => {
    setNickname(user?.nickname);
  }, [user]);

  const handleLogout = async () => {
    const { error } = await db.auth.signOut();
    console.log(error);
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleCancleEdit = () => {
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
    <>
      <StProfileBackGround />
      <StProfileWrapper>
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
                <Button type="primary" onClick={handleCompleteButton}>
                  수정 완료
                </Button>
                <Button onClick={handleCancleEdit}>수정 취소</Button>
              </>
            )}
          </StProfileButtons>
        </StProfileDiv>
      </StProfileWrapper>
    </>
  );
}

export default Profile;

const StProfileWrapper = styled.div`
  margin-top: 125px;
  height: 150px;
  background-color: white;
`;

const StProfileBackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 200px;
  background-color: #2d18a0;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  width: 290px;
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
