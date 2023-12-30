import { Avatar, Button, Card, Input, Form } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { db } from '../../supabase';
import { useQueryUser } from '../../hooks/query/useSupabase';
import InputprofileForm from './InputProfileForm';
import { loginState } from '../../recoil/auth';
import { useRecoilValue } from 'recoil';

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
    <div>
      <Card style={{ width: 400 }}>
        <h1>My Profile</h1>

        {isEditing && (
          <InputprofileForm setComplete={() => setIsEditing(false)} />
        )}

        {!isEditing && (
          <>
            <Meta
              avatar={<Avatar src={`${user?.avatar_url}`} />}
              title={user?.nickname ?? '닉네임을 입력해주세요'}
              description={`${user?.email}`}
            />
            {/* <li>{user?.email} </li> */}
          </>
        )}

        {/* <Button onClick={handleEditButton}>
          { ? '프로필 수정' : '수정 완료'}
        </Button> */}
        {!isEditing && <Button onClick={handleEditButton}>프로필 수정</Button>}
        <Button onClick={handleLogout}>로그아웃</Button>
      </Card>
    </div>
  );
}

export default Profile;
