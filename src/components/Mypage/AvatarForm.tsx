import { message } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/auth';
import styled from 'styled-components';

function AvatarForm() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const loginUser = useRecoilValue(loginState);
  const userId = loginUser?.id!;

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewURL(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
      setSelectedFile(file);
    } else {
      message.error('선택 파일 없음');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="profileImg">
          {previewURL && (
            <StAvatarImg src={previewURL} alt="프로필 이미지 미리보기" />
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}

export default AvatarForm;

const StAvatarImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;
