import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { Button, Dropdown, MenuProps } from 'antd';
import { useEffect } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryNotifications } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { notificationListState } from '../../recoil/notification';
import { db, handleNotification } from '../../supabase';
import { NotificationType } from '../../supabase/supabase.types';
import Notification from './Notification';

const NotificationList = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(loginState);
  const [notificationList, setNotificationList] = useRecoilState(
    notificationListState
  );
  const { notifications, isLoading, isError } = useQueryNotifications(
    auth?.id!
  );

  useEffect(() => {
    if (notifications && !isLoading && !isError) {
      console.log('from query : ', notifications);
      setNotificationList((oldList) => [...notifications]);
    }
    return () => {
      db.removeAllChannels();
    };
  }, [notifications]);

  handleNotification(
    (payload: RealtimePostgresInsertPayload<NotificationType>) => {
      const newItem = payload.new;
      if (payload.new.recipientUserId === auth?.id) {
        setNotificationList((oldList) => [newItem, ...oldList]);
        console.log('payload: ', notificationList);
      }
    }
  );

  const items: MenuProps['items'] =
    // if(notificationList.length) {}
    notificationList.map((item) => ({
      label: <Notification notification={item} />,
      key: item.id
    }));

  return (
    <StDropdown menu={{ items }} trigger={['click']}>
      <Button icon={<IoIosNotifications />} />
    </StDropdown>
  );
};

export default NotificationList;

const StDropdown = styled(Dropdown)`
  display: flex;
  justify-content: center;
  border-radius: 100%;
  height: 32px;
  svg {
    font-size: 2.4rem;
  }
`;
