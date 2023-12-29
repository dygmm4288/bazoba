import { atom } from 'recoil';
import { CategoryType } from '../supabase/supabase.types';
import { EDIT_INPUT_CATEGORY, EDIT_INPUT_TITLE } from './keys';

export const titleState = atom<string>({
  key: EDIT_INPUT_TITLE,
  default: ''
});
export const categoryState = atom<CategoryType>({
  key: EDIT_INPUT_CATEGORY,
  default: 'REACT'
});
