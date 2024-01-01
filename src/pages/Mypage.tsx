import { Card, Flex, Tabs } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FilteredBookmarkPosts from '../components/Mypage/FilteredBookmarkPosts';
import FilteredPosts from '../components/Mypage/FilteredPosts';
import Profile from '../components/Mypage/Profile';
import { loginState } from '../recoil/auth';

const enum filterKey {
  MYPOST,
  BOOKMARK
}

export default function Mypage() {
  const user = useRecoilValue(loginState);
  const [filter, setFilter] = useState(filterKey.MYPOST);

  const userId = user?.id!;
  const tabs = [
    {
      key: '1',
      label: '내 프로젝트',
      content: <FilteredPosts userId={userId} />
    },
    {
      key: '2',
      label: '찜한 프로젝트',
      content: <FilteredBookmarkPosts userId={userId} />
    }
  ];
  const handleMyPosts = () => {
    setFilter(filterKey.MYPOST);
  };

  const handleBookmarkedPosts = () => {
    setFilter(filterKey.BOOKMARK);
  };

  return (
    <div>
      {/* //   <Flex justify='center'> */}
      <Flex
        vertical={true}
        justify={'center'}
        style={{ maxWidth: '1200px', margin: 'auto' }}
      >
        <div>
          <Profile />
          <Tabs type="card" size={'large'}>
            {tabs.map((tab) => (
              <Tabs.TabPane tab={<span>{tab.label}</span>} key={tab.key}>
                {tab.content}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </Flex>
    </div>
  );
}
