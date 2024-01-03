import { Button, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import NotificationList from './NotificationList';

const HeaderWrapper = () => {
  const isLogin = useRecoilValue(loginState);
  const userId = isLogin?.id ? isLogin.id : '';
  const { user } = useQueryUser(userId);

  return (
    <StHeader>
      <div>
        <StLogoLink to="/">home</StLogoLink>
      </div>
      <Space align="center">
        {!isLogin && <StLink to="/login">Sign In</StLink>}
        {isLogin && (
          <Button
            children={<StLink to="/write"> 내 프로젝트 게시하기 </StLink>}
          />
        )}
        {isLogin && <NotificationList />}
        {isLogin && (
          <StUserAvatarLink $avatarUrl={user?.avatar_url!} to="/mypage">
            My Page
          </StUserAvatarLink>
        )}
      </Space>
    </StHeader>
  );
};

export default HeaderWrapper;

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
  z-index: 103;
  background-color: #fff;
`;

const StLogoLink = styled(Link)`
  display: block;
  width: 100px;
  font-size: 0;
  background-image: url('https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/sign/assets/logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbG9nby5zdmciLCJpYXQiOjE3MDQxODkzMDYsImV4cCI6MTczNTcyNTMwNn0._bxQz3uQQqIpIQOYH_icLuf8UOQu3g1kXDfXzYDm_mk&t=2024-01-02T09%3A55%3A07.172Z');
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
