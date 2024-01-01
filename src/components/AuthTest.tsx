import { Button, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryUser } from '../hooks/query/useSupabase';
import { loginState } from '../recoil/auth';

export default function AuthTest() {
  const isLogin = useRecoilValue(loginState);
  const userId = isLogin?.id ? isLogin.id : '';
  const { user } = useQueryUser(userId);

  return (
    <>
      {/* header 임시 */}
      <StHeader>
        <div>
          <StLogoLink href="/">home</StLogoLink>
        </div>
        <Space align="center">
          {/* {<StLink to="/write">게시하기</StLink>} */}
          {!isLogin && <StLink to="/login">Sign In</StLink>}
          {isLogin && (
            <Button
              children={<StLink to="/write"> 내 프로젝트 게시하기 </StLink>}
            />
          )}
          {isLogin && (
            <StUserAvatarLink $avatarUrl={user?.avatar_url!} to="/mypage">
              My Page
            </StUserAvatarLink>
          )}
        </Space>
      </StHeader>
      <StContent>
        <Outlet />
      </StContent>
    </>
  );
}
interface StUserAvatarLinkProps {
  $avatarUrl?: string;
}

const StHeader = styled(Header)`
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  z-index: 3;
  background-color: #fff;
`;

const StContent = styled(Content)`
  /* background-color: #eee; */
`;

const StLogoLink = styled.a`
  display: block;
  width: 100px;
  font-size: 0;
  background-image: url('https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/sign/assets/logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbG9nby5zdmciLCJpYXQiOjE3MDQwMzMwMTIsImV4cCI6MTczNTU2OTAxMn0.t21wDXZH4YM4CXY3oRqAct48f9aFoiA-byIrSe71IKs&t=2023-12-31T14%3A30%3A12.961Z');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const StUserAvatarLink = styled(Link)<StUserAvatarLinkProps>`
  display: block;
  width: 48px;
  height: 48px;
  margin-left: 12px;
  background-image: url(${(props) => props.$avatarUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 100%;
  font-size: 0;
`;

const StLink = styled(Link)`
  color: #000;
  font-weight: 700;
`;
