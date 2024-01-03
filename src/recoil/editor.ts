import { atom } from 'recoil';
import { CategoryType, UserType } from '../supabase/supabase.types';
import {
  EDIT_INPUT_CATEGORY,
  EDIT_INPUT_TITLE,
  EDIT_LOADING,
  EDIT_MENTION,
  EDIT_SUMMARY,
  EDIT_THUMBNAIL_URL
} from './keys';

export const titleState = atom<string>({
  key: EDIT_INPUT_TITLE,
  default: ''
});
export const categoryState = atom<CategoryType>({
  key: EDIT_INPUT_CATEGORY,
  default: 'REACT'
});

export const isLoadingState = atom<boolean>({
  key: EDIT_LOADING,
  default: false
});
export const thumbnailUrlState = atom<string | null>({
  key: EDIT_THUMBNAIL_URL,
  default: null
});
export const summaryState = atom<string>({
  key: EDIT_SUMMARY,
  default: ''
});
export const mentionedUserState = atom<UserType[]>({
  key: EDIT_MENTION,
  default: []
});
