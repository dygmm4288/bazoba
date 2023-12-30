import { Button, Flex, Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import EditorHeader from '../components/Editor/EditorHeader';
import EditorMain from '../components/Editor/EditorMain';
import EditorPost from '../components/Editor/EditorPost';
import useEditorForm from '../hooks/useEditorForm';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleForm,
    editorRef,
    handleCategory,
    handleTitle,
    handleTogglePostMode,
    handleAction,
    isPostMode
  } = useEditorForm({ id });

  const handleGoHome = () => navigate('/');

  return (
    <Layout style={{ padding: '1.5rem' }}>
      <form onSubmit={handleForm}>
        <Flex gap="middle" vertical>
          <EditorHeader
            handleCategory={handleCategory}
            handleTitle={handleTitle}
          />
          <EditorMain editorRef={editorRef} />
          <Footer>
            <Flex justify="flex-end" align="center" gap="large">
              <Button size="large" danger onClick={handleGoHome}>
                취소하기
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleTogglePostMode(true)}
              >
                게시하기
              </Button>
            </Flex>
          </Footer>
          {isPostMode && (
            <StEditorOverlay>
              <EditorPost
                handleAction={handleAction}
                handleTogglePostMode={handleTogglePostMode}
              />
            </StEditorOverlay>
          )}
        </Flex>
      </form>
    </Layout>
  );
}

const StEditorOverlay = styled.div`
  box-sizing: 0;
  position: absolute;
  inset: 0;
  z-index: 100000;
  background-color: lightblue;

  display: flex;
  & > * {
    margin: auto;
  }
  transform: translateY(0);
`;
