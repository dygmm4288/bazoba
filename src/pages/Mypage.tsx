import React, { useState } from 'react';
import { Card, Flex } from 'antd';
import Profile from '../components/Mypage/Profile';
import { useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';
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
      <Flex vertical={false} justify={'center'}>
        <div style={{ paddingTop: 16 }}>
          <Profile />
          <Card style={{ width: 400 }}>
            <div onClick={handleFilterPost}> 내 게시물 보기 {'=>'} </div>
          </Card>
          <Card style={{ width: 400 }}>
            <div onClick={handleFilterPost}> 찜한 게시물 보기 {'=>'} </div>
          </Card>
        </div>
        <FilteredPosts
          optionKey={'author'}
          optionValue={userId}
          refetchTrigger={enableRefetch}
        />
      </Flex>
    </div>
  );
}
