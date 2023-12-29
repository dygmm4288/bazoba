import { ThemeSupa } from '@supabase/auth-ui-shared';
import { db } from '../supabase';
import { Auth } from '@supabase/auth-ui-react';
import { styled } from 'styled-components';

export default function Login() {
  return (
    <LoginContainer>
      <Auth
        supabaseClient={db}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'github']}
      />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;
