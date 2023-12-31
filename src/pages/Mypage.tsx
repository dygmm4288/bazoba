import { Flex, Tabs } from 'antd';
import { useRecoilValue } from 'recoil';
import FilteredBookmarkPosts from '../components/Mypage/FilteredBookmarkPosts';
import FilteredPosts from '../components/Mypage/FilteredPosts';
import Profile from '../components/Mypage/Profile';
import { loginState } from '../recoil/auth';
import FilteredProjects from '../components/Mypage/FilteredProjects';

export default function Mypage() {
  const user = useRecoilValue(loginState);
  const userId = user?.id!;
  const tabs = [
    {
      key: '1',
      label: '내 프로젝트',
      content: <FilteredPosts userId={userId} />
    },
    {
      key: '2',
      label: '내가 참여한 프로젝트',
      content: <FilteredProjects userId={userId} />
    },
    {
      key: '3',
      label: '내 북마크',
      content: <FilteredBookmarkPosts userId={userId} />
    }
  ];

  return (
    <div>
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
