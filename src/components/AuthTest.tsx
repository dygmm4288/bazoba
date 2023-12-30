import { Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { loginState } from '../recoil/auth';

export default function AuthTest() {
  const isLogin = useRecoilValue(loginState);
  return (
    <>
      {/* header 임시 */}
      <StHeader>
        <Space align="center">
          {!isLogin && <Link to="/login">login</Link>}
          {isLogin && <Link to="/mypage">mypage</Link>}
          {<Link to="/write">write</Link>}
          <Link to="/">home</Link>
        </Space>
      </StHeader>
      <StContent>
        <Outlet />
      </StContent>
    </>
  );
}

const StHeader = styled(Header)`
  background-color: #00d9ff;
`;

const StContent = styled(Content)`
  background-color: #eee;
  padding: 0 48px;
`;
