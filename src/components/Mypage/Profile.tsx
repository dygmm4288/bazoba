import { Avatar, Button, Card, Input, Form } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { db } from '../../supabase';
import { useQueryUser } from '../../hooks/query/useSupabase';
import InputprofileForm from './InputProfileForm';
import { loginState } from '../../recoil/auth';
import { useRecoilValue } from 'recoil';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function Profile() {
  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id ? loginUser.id : '';
  const { user } = useQueryUser(userId);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    const { error } = await db.auth.signOut();
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  return (
    // <div>
    //   <Card style={{ width: 400 }}>
    //     <h1>My Profile</h1>

    //     {isEditing && (
    //       <InputprofileForm setComplete={() => setIsEditing(false)} />
    //     )}

    //     {!isEditing && (
    //       <div>
    //         <Avatar src={`${user?.avatar_url}`} />
    //         <Meta
    //           avatar={<Avatar src={`${user?.avatar_url}`} />}
    //           title={user?.nickname ?? '닉네임을 입력해주세요'}
    //           description={`${user?.email}`}
    //         />
    //       </div>
    //     )}

    //     {!isEditing && <Button onClick={handleEditButton}>프로필 수정</Button>}
    //     <Button onClick={handleLogout}>로그아웃</Button>
    //   </Card>
    // </div>

    <StProfileWrapper>
      <StProfileBackGround>배경입니다</StProfileBackGround>
      <StProfileDiv>
        <StProfileFigure>
          {user?.avatar_url ? (
            <Avatar
              style={{ position: 'absolute', top: '5px', left: '5px' }}
              size={170}
              src={user?.avatar_url}
            />
          ) : (
            <Avatar size={170} icon={<UserOutlined />} />
          )}
        </StProfileFigure>
        <StProfileText>
          <h1>{user?.nickname}</h1>
          <p>{user?.email}</p>
        </StProfileText>
        <StProfileButtons>
          <Button> 프로필 수정 </Button>
          <Button> 로그아웃 </Button>
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
  //justify-content: space-between;
`;
const StProfileFigure = styled.figure`
  position: relative;
  margin-left: 30px;
  top: -70px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: white;

  span > img:hover {
    filter: brightness(0.8);
  }
  /* span::after {
    top: -100px;
    content: '🔗';
  } */
`;

const StProfileText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  width: 400px;
  font-size: 1.5rem;
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
