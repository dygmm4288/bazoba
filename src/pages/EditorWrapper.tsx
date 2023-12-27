import { useParams } from 'react-router-dom';
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
    <form onSubmit={handleForm}>
      <EditorHeader
        handleCategory={handleCategory}
        handleTitle={handleTitle}
        title={title}
        category={category}
      />
      <EditorMain editorRef={editorRef} />
      <footer>
        <button type="submit">제출</button>
      </footer>
    </form>
  );
}
