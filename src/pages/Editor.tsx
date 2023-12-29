import { Button, Flex, Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import EditorHeader from '../components/Editor/EditorHeader';
import EditorMain from '../components/Editor/EditorMain';
import EditorPost from '../components/Editor/EditorPost';
import useEditorForm from '../hooks/useEditorForm';
import { categoryState, titleState } from '../recoil/editor';

export default function Editor() {
  const { id } = useParams();
  const title = useRecoilValue(titleState);
  const category = useRecoilValue(categoryState);
  const {
    handleForm,
    editorRef,
    handleCategory,
    handleTitle,
    handleTogglePostMode,
    handleChangeThumbnail,
    handleAction
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
            <Button type="primary" size="large" onClick={handleTogglePostMode}>
              게시하기
            </Button>
          </Flex>
        </Footer>
        <EditorPost
          handleChangeThumbnail={handleChangeThumbnail}
          handleAction={handleAction}
        />
      </form>
    </Layout>
  );
}
