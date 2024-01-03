import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface Props {
  isShow: boolean;
}
const ICON_SIZE = '2rem';

export default function EditorUploadLoading({ isShow }: Props) {
  const styleObject = {
    fontSize: ICON_SIZE
  };
  return (
    <StWrapper>
      {isShow ? (
        <LoadingOutlined style={styleObject} />
      ) : (
        <PlusOutlined style={styleObject} />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;

  border-radius: 1rem;
  border: 1px dashed white;

  &:hover > :not(div) {
    transition: all 0.2s ease-in;
    scale: 1.2;
  }
`;
