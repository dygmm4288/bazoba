import { useNavigate } from 'react-router-dom';
import { useRemoveNotification } from '../hooks/query/useSupabase';
import { NotificationType } from '../supabase/supabase.types';

interface Props {
  notification: NotificationType;
}

const Notification = ({ notification }: Props) => {
  const navigate = useNavigate();
  const { removeNotification } = useRemoveNotification(notification.id);
  const onNotificationClickHandler = (postId: string) => {
    removeNotification(notification.id);
    navigate(`/detail/${postId}`);
  };

  return (
    <div onClick={() => onNotificationClickHandler(notification.postId)}>
      {notification.actionUserNickname} 님이 {notification.type} 을 남겼습니다
    </div>
  );
};

export default Notification;
