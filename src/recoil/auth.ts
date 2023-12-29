import { AuthUser } from '@supabase/supabase-js';
import { atom } from 'recoil';
import { LOGIN_STATE } from './keys';

export const loginState = atom<AuthUser | null>({
  key: LOGIN_STATE,
  default:
    JSON.parse(
      localStorage.getItem('sb-borxwimnmhmdodedkkpv-auth-token') || 'null'
    )?.user || null
});
