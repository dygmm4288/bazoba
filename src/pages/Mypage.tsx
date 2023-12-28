import React, { useEffect, useState } from 'react';
import { db } from '../supabase';
import { AuthUser } from '@supabase/supabase-js';
import { Card } from 'antd';
import Profile from '../components/Mypage/Profile';
import { useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';

export default function Mypage() {
  const [user, setUser] = useState<AuthUser>();

  //TODO .. : 리액트 쿼리
  useEffect(() => {
    const getAuthUser = async () => {
      const { data, error } = await db.auth.getSession();
      setUser(data.session?.user);
    };
    getAuthUser();
  }, []);

  const handleFilterPost = () => {
    console.log('TODO: filtering');
  };

  return (
    <div>
      <Profile user={user} />
      <Card style={{ width: 400 }}>
        <div onClick={handleFilterPost}> 내 게시물 보기 {'=>'} </div>
      </Card>
      <Card style={{ width: 400 }}>
        <div onClick={handleFilterPost}> 찜한 게시물 보기 {'=>'} </div>
      </Card>
    </div>
  );
}
