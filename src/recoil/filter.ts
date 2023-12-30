import { atom } from 'recoil';
import { CategoryType } from '../supabase/supabase.types';

export const filterArrayState = atom<CategoryType[]>({
  key: 'filterArrayState',
  default: []
});
