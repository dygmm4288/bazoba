import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            if (!e.target.files[0].type.includes('image')) return;
            handleAction(e.target.files[0] as RcFile);
          }
        }}
      />
      {!thumbnailUrl ? uploadButton : <img src={thumbnailUrl} />}
      <TextArea
        showCount
        maxLength={150}
        style={{ resize: 'none' }}
        onChange={handleChangeSummary}
        value={summary}
      />
      <div>
        <Button size="large" danger>
          취소하기
        </Button>
        <Button size="large" type="primary" htmlType="submit">
          게시하기
        </Button>
      </div>
    </div>
  );
}
