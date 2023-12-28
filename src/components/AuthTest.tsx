import React, { useEffect } from 'react';
import { db } from '../supabase';
import { Outlet } from 'react-router';
import { Space } from 'antd';

export default function AuthTest() {
  useEffect(() => {
    const subscription = db.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'SIGNED_IN') {
        //TODO : isLogin 저장? 리코일?
        if (window.location.pathname === '/login') window.location.replace('/');
      } else if (event === 'SIGNED_OUT') {
        [window.localStorage, window.sessionStorage].forEach((storage) => {
          Object.entries(storage).forEach(([key]) => {
            storage.removeItem(key);
          });
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
          <a href="/login">login</a>
          <a href="/mypage">mypage</a>
        </Space>
      </header>

      <Outlet />
    </>
  );
}
