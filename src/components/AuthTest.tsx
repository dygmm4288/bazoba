import { Space } from 'antd';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';

export default function AuthTest() {
  const isLogin = useRecoilValue(loginState);
  return (
    <>
      {/* header 임시 */}
      <header>
        <Space align="center">
          {!isLogin && <Link to="/login">login</Link>}
          {isLogin && <Link to="/mypage">mypage</Link>}
          {<Link to="/write">write</Link>}
          <Link to="/">home</Link>
        </Space>
      </header>

      <Outlet />
    </>
  );
}
