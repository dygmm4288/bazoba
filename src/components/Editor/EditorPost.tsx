import { StorageError } from '@supabase/storage-js';
import { Button, Flex, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  isLoadingState,
  summaryState,
  thumbnailUrlState
} from '../../recoil/editor';
import EditorUploadLoading from './EditorUploadLoading';

interface Props {
  handleAction: (file: File) => Promise<string | StorageError>;
  handleTogglePostMode: (isPostMode?: boolean) => () => void;
}

export default function EditorPost({
  handleAction,
  handleTogglePostMode
}: Props) {
  const isLoading = useRecoilValue(isLoadingState);
  const [thumbnailUrl, setThumbnail] = useRecoilState(thumbnailUrlState);
  const inputRef = useRef<HTMLInputElement>(null);
  const [summary, setSummary] = useRecoilState(summaryState);

  const handleChangeSummary = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleChangeInputFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file || !isImageFile(file)) {
        e.target.value = '';
        message.error('이미지 파일을 업로드 해주세요.');
        return;
      }
      const result = await handleAction(file);
      if (typeof result !== 'string') {
        e.target.value = '';
        message.error('이미지를 업로드 하는데 실패했습니다.');
      }
    }
  };
  const handleSetDefaultThumbnail = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setThumbnail(null);
    }
  };

  return (
    <Flex vertical gap="large" style={{ color: 'white' }}>
      <StInputWrapper>
        <input
          type="file"
          id="image-file-input"
          onChange={handleChangeInputFile}
          ref={inputRef}
        />
        <label htmlFor="image-file-input">
          {!thumbnailUrl && <EditorUploadLoading isShow={isLoading} />}
          {thumbnailUrl && (
            <img src={thumbnailUrl} alt={'프로젝트에 관련된 썸네일 이미지'} />
          )}
        </label>
        {thumbnailUrl && (
          <Button onClick={handleSetDefaultThumbnail}>
            기본 이미지로 설정
          </Button>
        )}
        {!thumbnailUrl && (
          <span style={{ opacity: 0.5 }}>
            이미지를 업로드하지 않을 경우 트랙에 따른 이미지가 자동 업로드
            됩니다
          </span>
        )}
      </StInputWrapper>

      <TextArea
        showCount
        maxLength={150}
        size="large"
        style={{ resize: 'none', height: 100 }}
        onChange={handleChangeSummary}
        placeholder="요약을 입력해주세요."
        value={summary}
      />

      <Flex gap="large" justify="center">
        <Button size="large" danger onClick={handleTogglePostMode(false)}>
          취소하기
        </Button>
        <Button size="large" type="primary" htmlType="submit">
          게시하기
        </Button>
      </Flex>
    </Flex>
  );
}

const isImageFile = (file: File) => file.type.includes('image');

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }
  label {
    padding: 1rem;
    display: flex;
  }
  label img {
    height: 400px;
    object-fit: cover;
  }
`;
