import { useParams } from 'react-router-dom';
import EditorMain from '../components/Editor/EditorMain';
import useEditorForm from '../hooks/useEditorForm';
// /write -> 글작성하기
// /write/:id -> 글 수정하기 -> 서버로 부터 데이터를 받아와야하니까..

export default function EditorWrapper() {
  const { id } = useParams();
  const { handleForm, editorRef } = useEditorForm({ id });

  return (
    <form onSubmit={handleForm}>
      <header></header>
      <EditorMain editorRef={editorRef} />
      <footer>
        <button type="submit">제출</button>
      </footer>
    </form>
  );
}
