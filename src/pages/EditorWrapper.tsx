import { Button, Flex, Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';
import EditorHeader from '../components/Editor/EditorHeader';
import EditorMain from '../components/Editor/EditorMain';
import useEditorForm from '../hooks/useEditorForm';

export default function EditorWrapper() {
  const { id } = useParams();
  const {
    handleForm,
    editorRef,
    handleCategory,
    handleTitle,
    title,
    category
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
          title={title}
          category={category}
        />
        <EditorMain editorRef={editorRef} />
        <Footer>
          <Flex justify="flex-end" align="center" gap="large">
            <Button size="large" danger>
              취소하기
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              게시하기
            </Button>
          </Flex>
        </Footer>
      </form>
    </Layout>
  );
}
