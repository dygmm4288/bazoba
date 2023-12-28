import { atom } from 'recoil';
import { LOGIN_STATE } from './keys';

export const loginState = atom<boolean>({
  key: LOGIN_STATE,
  default: false
});
