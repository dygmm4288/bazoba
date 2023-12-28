import { Outlet } from 'react-router';
import { Space } from 'antd';
import useAuth from '../hooks/useAuth';

export default function AuthTest() {
  const { isLogin } = useAuth();
  return (
    <>
      {/* header 임시 */}
      <header>
        <Space align="center">
          {!isLogin && <a href="/login">login</a>}
          {isLogin && <a href="/mypage">mypage</a>}
        </Space>
      </header>

      <Outlet />
    </>
  );
}
