import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
  isShow: boolean;
}
const ICON_SIZE = '2rem';

export default function EditorUploadLoading({ isShow }: Props) {
  const styleObject = {
    fontSize: ICON_SIZE
  };
  return (
    <div>
      {isShow ? (
        <LoadingOutlined style={styleObject} />
      ) : (
        <PlusOutlined style={styleObject} />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
}
