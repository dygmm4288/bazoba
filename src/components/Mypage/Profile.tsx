import { Avatar, Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { db } from '../../supabase';
import { AuthUser } from '@supabase/supabase-js';

interface Props {
  user: AuthUser | undefined;
}

function Profile({ user }: Props) {
  const handleLogout = async () => {
    const { error } = await db.auth.signOut();
  };

  return (
    <div>
      <Card style={{ width: 400 }}>
        <h1>ANT CARD</h1>
        <ul>
          {/* TODO: deafault image OR 랜덤이미지 */}
          {/* TODO: user data 업데이트 */}
          {/*user?.user_metadata?.name</li> */}
        </ul>
        <Meta
          avatar={<Avatar src={`${user?.user_metadata.avatar_url}`} />}
          title={user?.email}
          description="This is the description"
        />
        <Button onClick={handleLogout}>로그아웃</Button>
      </Card>
    </div>
  );
}

export default Profile;
