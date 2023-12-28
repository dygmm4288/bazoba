import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from './recoil/auth';
import Router from './shared/Router';
import { db } from './supabase';

function App() {
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
    return () => {
      subscribe.data.subscription.unsubscribe();
    };
  }, []);

  return <Router isLogin={isLogin} />;
}

export default App;
