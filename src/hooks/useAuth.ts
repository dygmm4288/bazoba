import { useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';

export default function useAuth() {
  const isLogin = useRecoilValue(loginState);

  if (!isLogin) return null;

  const { id, user } = JSON.parse(
    localStorage.getItem('sb-borxwimnmhmdodedkkpv-auth-token')!
  );

  return { id, user };
}
