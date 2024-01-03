import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import { useRecoilValue } from 'recoil';
import HeaderWrapper from '../components/Header/HeaderWrapper';
import { useQueryUser } from '../hooks/query/useSupabase';
import { loginState } from '../recoil/auth';

export default function Layout() {
  const isLogin = useRecoilValue(loginState);
  const userId = isLogin?.id ? isLogin.id : '';
  const { user } = useQueryUser(userId);

  return (
    <>
      <HeaderWrapper />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
