import React, { useEffect, useState } from 'react';
import { db } from '../supabase';
import { Card } from 'antd';
import Profile from '../components/Mypage/Profile';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';
import { useQueryUser } from '../hooks/query/useSupabase';
import { User } from '@supabase/supabase-js';
import FilteredPosts from '../components/Mypage/FilteredPosts';

export default function Mypage() {
  const [enableRefetch, setEnableRefetch] = useState(false);
  const user = useRecoilValue(loginState);
  const userId = user?.id!;
  const handleFilterPost = () => {
    setEnableRefetch(true);
    console.log('TODO: filtering');
  };

  return (
    <div>
      <Profile />
      <Card style={{ width: 400 }}>
        <div onClick={handleFilterPost}> 내 게시물 보기 {'=>'} </div>
      </Card>
      <Card style={{ width: 400 }}>
        <div onClick={handleFilterPost}> 찜한 게시물 보기 {'=>'} </div>
      </Card>

      <FilteredPosts
        optionKey={'author'}
        optionValue={userId}
        refetchTrigger={enableRefetch}
      />
    </div>
  );
}
