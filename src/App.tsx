import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from './recoil/auth';
import Router from './shared/Router';
import { db } from './supabase';

function App() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const getUserData = async () => {
    const { data, error } = await db.auth.getUser();
    console.log(data.user?.user_metadata);
    return data;
  };

  useEffect(() => {
    const subscribe = db.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLogin(true);
        console.log(session?.user);
        console.log(db.auth);
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
