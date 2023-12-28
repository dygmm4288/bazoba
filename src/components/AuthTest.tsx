import React, { useEffect } from 'react';
import { db } from '../supabase';
import { Outlet } from 'react-router';
import { Space } from 'antd';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/auth';

export default function AuthTest() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  useEffect(() => {
    const subscription = db.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'SIGNED_IN') {
        setIsLogin(true);
        //TODO : 임시방편
        if (window.location.pathname === '/login') {
          window.location.replace('/');
        }
      } else if (event === 'SIGNED_OUT') {
        [window.localStorage, window.sessionStorage].forEach((storage) => {
          Object.entries(storage).forEach(([key]) => {
            storage.removeItem(key);
          });
          setIsLogin(false);
        });
        window.location.replace('/');
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });
    // call unsubscribe to remove the callback
    //subscription.unsubscribe();  // unsubscribe가 없음?
  }, []);

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
