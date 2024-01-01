import { Card, Flex } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FilteredBookmarkPosts from '../components/Mypage/FilteredBookmarkPosts';
import FilteredPosts from '../components/Mypage/FilteredPosts';
import Profile from '../components/Mypage/Profile';

const enum filterKey {
  MYPOST,
  BOOKMARK
}

export default function Mypage() {
  const user = useRecoilValue(loginState);
  const [filter, setFilter] = useState(filterKey.MYPOST);

  const userId = user?.id!;
  const handleMyPosts = () => {
    setFilter(filterKey.MYPOST);
  };

  const handleBookmarkedPosts = () => {
    setFilter(filterKey.BOOKMARK);
  };

  return (
    <div>
      <Flex vertical={false} justify={'center'}>
        <div style={{ paddingTop: 16 }}>
          <Profile />
          <Card style={{ width: 400 }}>
            <div onClick={handleMyPosts}> 내 게시물 보기 {'=>'} </div>
          </Card>
          <Card style={{ width: 400 }}>
            <div onClick={handleBookmarkedPosts}> 찜한 게시물 보기 {'=>'} </div>
          </Card>
        </div>

        {filter === filterKey.BOOKMARK && (
          <FilteredBookmarkPosts userId={userId} />
        )}
        {filter === filterKey.MYPOST && <FilteredPosts userId={userId} />}
      </Flex>
    </div>
  );
}
