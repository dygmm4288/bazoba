import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Popconfirm, message } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useQueryUser, useUpdateUser } from '../../hooks/query/useSupabase';
import { loginState } from '../../recoil/auth';
import { uploadUserImage } from '../../supabase';
import { TablesUpdate } from '../../supabase/supabaseSchema.types';

function AvatarForm() {
  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id ? loginUser.id : '';
  const { user } = useQueryUser(userId);
  const { updateUser } = useUpdateUser(userId);
  const [previewURL, setPreviewURL] = useState(user?.avatar_url);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviewURL(user?.avatar_url);
  }, [user]);

  const uploadImageToDB = async () => {
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const subUrl = `${userId}/${fileName}`;

      const { data: url, error } = await uploadUserImage(subUrl, selectedFile);
      if (error) {
        message.error('서버에 이미지 등록 실패');
        return '';
      }
      return url;
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
    } else {
      message.error('선택된 파일이 없습니다.');
    }
  };

  const handleUploadButton = async () => {
    if (!selectedFile) {
      message.info('수정내용이 없습니다');
      setIsEdit(false);
      return;
    }
    setLoading(true);
    const url = await uploadImageToDB();
    if (url) {
      const newUser: TablesUpdate<'users'> = {
        id: userId,
        avatar_url: url
      };
      updateUser(newUser);
      setLoading(false);
      setPreviewURL(url);
      message.info('수정 완료!');
    } else {
      setLoading(false);
      setPreviewURL(user?.avatar_url);
      setSelectedFile(null);
    }
    setIsEdit(false);
  };

  const handleCancleEditButton = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSelectedFile(null);
    setPreviewURL(user?.avatar_url);
    setIsEdit(false);
  };

  const handleImageClicked = () => {
    /* 명시적으로 선언한 함수 
       컨펌 시 호출*/
  };

  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (inputRef.current) {
      inputRef.current.click();
      setIsEdit(true);
    }
    message.success('파일을 선택하세요');
  };

  return (
    <StFigureWrapper>
      <StProfileFigure onClick={handleImageClicked}>
        <Popconfirm
          title="프로필 이미지 수정"
          description="프로필 이미지를 변경하시겠습니까?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          disabled={loading}
        >
          {previewURL ? (
            <Avatar
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                borderRadius: '50%'
              }}
              size={170}
              src={!loading && previewURL}
              icon={loading && <LoadingOutlined />}
            />
          ) : (
            <Avatar
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                borderRadius: '50%'
              }}
              size={170}
              icon={<UserOutlined />}
            />
          )}
        </Popconfirm>
      </StProfileFigure>
      <input
        type="file"
        accept="image/*"
        id="profileImg"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileSelect}
        disabled={loading}
      />
      {isEdit && (
        <div>
          <Button
            icon={<CheckCircleOutlined />}
            type="primary"
            style={{ left: '55px', top: '178px' }}
            onClick={handleUploadButton}
            disabled={loading}
          />
          <Button
            icon={<CloseCircleOutlined />}
            type="default"
            style={{ left: '60px', top: '178px' }}
            onClick={handleCancleEditButton}
            disabled={loading}
          />
        </div>
      )}
    </StFigureWrapper>
  );
}
const isImageFile = (file: File) => file.type.includes('image');
export default AvatarForm;

const StFigureWrapper = styled.div`
  position: relative;
  margin-left: 30px;
  top: -70px;
  min-width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: white;
`;

const StProfileFigure = styled.figure`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  span > img:hover {
    filter: brightness(0.8);
  }
`;
