import { atom } from 'recoil';
import { NotificationType } from '../supabase/supabase.types';

export const notificationListState = atom<NotificationType[]>({
  key: 'notificationListState',
  default: []
});
