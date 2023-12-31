import React, { useState } from 'react';
import { Card, Flex } from 'antd';
import Profile from '../components/Mypage/Profile';
import { useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';
import FilteredPosts from '../components/Mypage/FilteredPosts';
import FilteredBookmarkPosts from '../components/Mypage/FilteredBookmarkPosts';

export default function Mypage() {
  const user = useRecoilValue(loginState);
  const [filter, setFilter] = useState('myposts');

  const userId = user?.id!;
  const handleMyPosts = () => {
    setFilter('myposts');
  };

  const handleBookmarkedPosts = () => {
    setFilter('bookmarks');
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

        {filter === 'bookmarks' && (
          <FilteredBookmarkPosts
            db={'bookmarks'}
            filterKey={'userId'}
            filterValue={userId}
          />
        )}
        {filter === 'myposts' && (
          <FilteredPosts
            db={'posts'}
            filterKey={'author'}
            filterValue={userId}
          />
        )}
      </Flex>
    </div>
  );
}
