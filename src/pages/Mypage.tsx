import { Card, Flex } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FilteredPosts from '../components/Mypage/FilteredPosts';
import Profile from '../components/Mypage/Profile';
import { loginState } from '../recoil/auth';

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
          filterKey={'author'}
          filterValue={userId}
          refetchTrigger={enableRefetch}
        />
      </Flex>
    </div>
  );
}
