import { StorageError } from '@supabase/storage-js';
import { Button, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isLoadingState,
  summaryState,
  thumbnailUrlState
} from '../../recoil/editor';
import EditorUploadLoading from './EditorUploadLoading';

interface Props {
  handleAction: (file: File) => Promise<string | StorageError>;
}

export default function EditorPost({ handleAction }: Props) {
  const isLoading = useRecoilValue(isLoadingState);
  const thumbnailUrl = useRecoilValue(thumbnailUrlState);
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

  return (
    <div>
      <input type="file" onChange={handleChangeInputFile} />
      <EditorUploadLoading isShow={isLoading} />
      {thumbnailUrl && (
        <img src={thumbnailUrl} alt={'프로젝트에 관련된 썸네일 이미지'} />
      )}

      <TextArea
        showCount
        maxLength={150}
        style={{ resize: 'none' }}
        onChange={handleChangeSummary}
        placeholder="요약을 입력해주세요."
        value={summary}
      />
      <Space>
        <Button size="large" danger>
          취소하기
        </Button>
        <Button size="large" type="primary" htmlType="submit">
          게시하기
        </Button>
      </Space>
    </div>
  );
}

const isImageFile = (file: File) => file.type.includes('image');
