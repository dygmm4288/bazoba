import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import GlobalStyle from './GlobalStyle';
import { useAddUser } from './hooks/query/useSupabase';
import { loginState } from './recoil/auth';
import Router from './shared/Router';
import { db } from './supabase';
import { UserType } from './supabase/supabase.types';

function App() {
  const [auth, setAuth] = useRecoilState(loginState);
  const { addUser } = useAddUser();

  useEffect(() => {
    const subscribe = db.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setAuth(session?.user!);
        const { id, email, user_metadata } = session?.user!;
        const user: UserType = {
          id,
          email: email || 'default@email.com',
          nickname: user_metadata.name || email?.split('@').shift(),
          avatar_url: user_metadata.avatar_url || `https://robohash.org/${id}`
        };
        addUser(user);
      } else if (event === 'SIGNED_OUT') {
        setAuth(null);
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

  return (
    <>
      <GlobalStyle />
      <Router isLogin={!!auth} />
    </>
  );
}

export default App;
