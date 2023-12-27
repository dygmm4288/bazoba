import React, { useEffect, useState } from 'react';
import { db } from '../supabase';
import { AuthUser } from '@supabase/supabase-js';
import { Card } from 'antd';
import { AuthCard } from '@supabase/auth-ui-react';

const Mypage = () => {
  const [user, setUser] = useState<AuthUser>();

  useEffect(() => {
    const getAuthUser = async () => {
      const { data, error } = await db.auth.getSession();
      setUser(data.session?.user);
    };

    getAuthUser();
  });

  return (
    <div>
      mypage
      <Card>ant card</Card>
      <AuthCard> auth card 이건 뭔데</AuthCard>
      <ul>
        <li>{user?.email}</li>
        {/* <li>{user?.user_metadata.xx}</li> */}
      </ul>
    </div>
  );
};

export default Mypage;
