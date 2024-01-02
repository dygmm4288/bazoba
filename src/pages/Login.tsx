import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { styled } from 'styled-components';
import { db } from '../supabase';

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
  height: 100vh;
  & > * {
    margin-top: 50%;
  }
`;
