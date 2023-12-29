import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isLoadingState,
  summaryState,
  thumbnailUrlState
} from '../../recoil/editor';

const ICON_SIZE = '2rem';

interface Props {
  handleChangeThumbnail: UploadProps['onChange'];
  handleAction: (file: RcFile) => void;
}

export default function EditorPost({ handleAction }: Props) {
  const isLoading = useRecoilValue(isLoadingState);
  const thumbnailUrl = useRecoilValue(thumbnailUrlState);
  const [summary, setSummary] = useRecoilState(summaryState);

  const uploadButton = (
    <div>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <PlusOutlined style={{ fontSize: ICON_SIZE }} />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeSummary = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file || !isImageFile(file)) {
        message.error('이미지 파일을 업로드 해주세요.');
        return;
      }

      handleAction(file as RcFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChangeInputFile} />
      {!thumbnailUrl ? uploadButton : <img src={thumbnailUrl} />}

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
