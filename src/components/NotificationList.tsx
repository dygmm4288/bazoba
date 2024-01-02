import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { Button, Dropdown, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryNotifications } from '../hooks/query/useSupabase';
import { loginState } from '../recoil/auth';
import { notificationListState } from '../recoil/notification';
import { db, handleNotification } from '../supabase';
import { NotificationType } from '../supabase/supabase.types';
import Notification from './Notification';

const NotificationList = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(loginState);
  const [notificationList, setNotificationList] = useRecoilState(
    notificationListState
  );
  const { notifications, isLoading, isError, refetch } = useQueryNotifications(
    auth?.id!
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notifications && !isLoading && !isError) {
      setNotificationList((oldList) => [...notifications, ...oldList]);
    }

    return () => {
      db.removeAllChannels();
    };
  }, [notifications]);
  handleNotification(
    (payload: RealtimePostgresInsertPayload<NotificationType>) => {
      console.log(payload);
      const newItem = payload.new;
      setNotificationList((oldList) => [newItem, ...oldList]);
    }
  );

  const onDropdownOpenHandler = async (
    open: boolean,
    info: { source: string }
  ) => {
    // if (open) {
    //   const { data } = await refetch();
    //   if (data) setNotificationList((oldList) => [...data]);
    // }
  };

  const items: MenuProps['items'] = notificationList.map((item) => ({
    label: <Notification notification={item} />,
    key: item.id
  }));

  return (
    <StDropdown
      menu={{ items }}
      trigger={['click']}
      onOpenChange={onDropdownOpenHandler}
    >
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
