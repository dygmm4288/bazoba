import { Button, Flex, Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';

import EditorHeader from '../components/Editor/EditorHeader';
import EditorMain from '../components/Editor/EditorMain';
import EditorPost from '../components/Editor/EditorPost';
import useEditorForm from '../hooks/useEditorForm';

export default function Editor() {
  const { id } = useParams();

  const {
    handleForm,
    editorRef,
    handleCategory,
    handleTitle,
    handleTogglePostMode,
    handleAction,
    isPostMode
  } = useEditorForm({ id });

  return (
    <Layout>
      <Header>
        <Link to="/">홈으로</Link>
      </Header>
      <form onSubmit={handleForm}>
        <EditorHeader
          handleCategory={handleCategory}
          handleTitle={handleTitle}
        />
        <EditorMain editorRef={editorRef} />
        <Footer>
          <Flex justify="flex-end" align="center" gap="large">
            <Button size="large" danger onClick={handleTogglePostMode(false)}>
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
        {isPostMode && <EditorPost handleAction={handleAction} />}
      </form>
    </Layout>
  );
}
