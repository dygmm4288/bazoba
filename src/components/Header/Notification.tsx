import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useRemoveNotification } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { NotificationType } from '../../supabase/supabase.types';

interface Props {
  notification: NotificationType;
}

const Notification = ({ notification }: Props) => {
  const auth = useRecoilValue(loginState);
  const navigate = useNavigate();
  const { removeNotification } = useRemoveNotification(
    notification.id,
    auth?.id!
  );
  const onNotificationClickHandler = (postId: string) => {
    removeNotification(notification.id);
    // updateNotification 으로 하는것도 좋겠어
    navigate(`/detail/${postId}`);
  };

  return (
    <div onClick={() => onNotificationClickHandler(notification.postId)}>
      {notification.actionUserNickname} 님이 {notification.type} 을 남겼습니다
    </div>
  );
};

export default Notification;
