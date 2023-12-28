import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { db } from '../supabase';
import { loginState } from '../recoil/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useAuth() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  useEffect(() => {
    const subscribe = db.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLogin(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLogin(false);
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });
    // call unsubscribe to remove the callback
    //subscription.unsubscribe();  // unsubscribe가 없음?
    return () => {
      subscribe.data.subscription.unsubscribe();
    };
  }, []);

  return { isLogin };
}
