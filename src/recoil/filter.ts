import { atom } from 'recoil';
import { CategoryType } from '../supabase/supabase.types';

export const postCategoryFilterState = atom<CategoryType[]>({
  key: 'postCategoryFilterState',
  default: []
});
