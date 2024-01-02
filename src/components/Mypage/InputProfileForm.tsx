import { User } from '@supabase/supabase-js';
import { Input, Form, Button, Upload, message } from 'antd';
import React, { ChangeEvent, useRef, useState } from 'react';
import { TablesUpdate } from '../../supabase/supabaseSchema.types';
import { useRecoilValue } from 'recoil';
import { useQueryUser, useUpdateUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import styled from 'styled-components';
import { uploadUserImage } from '../../supabase';

interface Props {
  setComplete: () => void;
}

export default function InputprofileForm({ setComplete }: Props) {
  //const [];
  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id ? loginUser.id : '';
  const { user } = useQueryUser(userId);
  const { updateUser } = useUpdateUser(userId);
  const [nickname, setNickname] = useState(user?.nickname);
  const [previewURL, setPreviewURL] = useState(user?.avatar_url);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImageToDB = async () => {
    if (selectedFile) {
      //issue: 이름 중복되면 db에는 업데이트 되지만 이미지 업데이트가 안된것처럼 보임
      //user_images storage에 userId 당 하나만 저장하려고했는데..ㅠ.ㅠ 실패~
      const subUrl = `${userId}/${selectedFile.name}`;
      const { data: url, error } = await uploadUserImage(subUrl, selectedFile);
      if (error) {
        message.error('서버에 이미지 등록 실패');
        return '';
      }
      return url;
    }
  };

  const handleCompleteButton = async () => {
    if (user && nickname?.trim() === user?.nickname && !selectedFile) {
      message.info('수정내용이 없습니다');
      setComplete();
      return;
    }
    const url = await uploadImageToDB();

    const newUser: TablesUpdate<'users'> = {
      id: userId,
      nickname,
      avatar_url: url
    };
    updateUser(newUser);
    message.info('수정 완료!');

    setComplete();
  };

  const handleImageClicked = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file || !isImageFile(file)) {
        e.target.value = '';
        message.error('이미지 파일을 업로드 해주세요.');
        return;
      }
      setSelectedFile(e.target.files[0]);
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewURL(imgUrl);
    }
  };

  const handleCancleEdit = () => {
    setNickname(user?.nickname);
    setPreviewURL(user?.avatar_url);
    setComplete();
  };

  return (
    <>
      {/* TODO: 분리.. 포기*/}
      {/* <AvatarForm  /> */}
      <Stfigure>
        <StAvatarImg
          onClick={handleImageClicked}
          src={previewURL}
          alt="avatar"
        />
      </Stfigure>
      <StFileInput
        type="file"
        accept="image/*"
        id="profileImg"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="email">
          <Input disabled defaultValue={user?.email} />
        </Form.Item>
        <Form.Item label="nickname">
          <Input
            placeholder="닉네임을 입력해주세요"
            defaultValue={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
      <Button onClick={handleCompleteButton}>수정 완료</Button>
      <Button onClick={handleCancleEdit}>수정 취소</Button>
    </>
  );
}

const isImageFile = (file: File) => file.type.includes('image');

const Stfigure = styled.figure`
  width: 100px;
  height: 100px;
  background-color: green;
  border-radius: 50%;
  overflow: hidden;
`;
const StAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
  &::after {
    content: '🔗';
  }
`;

const StFileInput = styled.input`
  display: none;
`;
