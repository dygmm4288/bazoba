import { User } from '@supabase/supabase-js';
import { Input, Form, Button } from 'antd';
import React, { useState } from 'react';
import { TablesUpdate } from '../../supabase/supabaseSchema.types';
import { useRecoilValue } from 'recoil';
import { useQueryUser, useUpdateUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';

interface Props {
  handleComplete: () => void;
}

function InputprofileForm({ handleComplete }: Props) {
  //const [];
  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id ? loginUser.id : '';
  const { user } = useQueryUser(userId);
  const { updateUser } = useUpdateUser(userId);
  const [nickname, setNickname] = useState(user?.nickname);

  const handleCompleteButton = () => {
    if (user && user?.nickname.trim() !== '') {
      const newUser: TablesUpdate<'users'> = {
        id: userId,
        nickname
      };
      updateUser(newUser);
    }
    handleComplete();
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Input">
          <Input
            placeholder="닉네임을 입력해주세요"
            defaultValue={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          ;
        </Form.Item>
      </Form>
      <Button onClick={handleCompleteButton}>수정 완료</Button>
    </>
  );
}

export default InputprofileForm;
