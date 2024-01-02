import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryNotifications } from '../hooks/query/useSupabase';
import { loginState } from '../recoil/auth';
import { notificationListState } from '../recoil/notification';
import { db, handleNotification } from '../supabase';
import { NotificationType } from '../supabase/supabase.types';

const Notification = () => {
  const auth = useRecoilValue(loginState);
  const [notificationList, setNotificationList] = useRecoilState(
    notificationListState
  );
  const { notifications, isLoading, isError } = useQueryNotifications(
    auth?.id!
  );

  useEffect(() => {
    if (notifications && !isLoading && !isError) {
      setNotificationList((oldList) => [...notifications, ...oldList]);
    }

    return () => {
      db.removeAllChannels();
    };
  }, []);

  handleNotification(
    (payload: RealtimePostgresInsertPayload<NotificationType>) => {
      console.log(payload);
      const newItem = payload.new;
      setNotificationList((oldList) => [newItem, ...oldList]);
    }
  );

  console.log(notificationList);

  return (
    <StNotificationList>
      {notificationList.map((item) => (
        <li key={item.id}>
          {item.actionUserNickname} + {item.postId}
        </li>
      ))}
    </StNotificationList>
  );
};

export default Notification;

const StNotificationList = styled.ul`
  position: absolute;
  top: 0%;
  left: 50%;
  background-color: #eee;

  li {
    height: 24px;
  }
`;
