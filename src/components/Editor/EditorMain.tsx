import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { EditorRefType } from '../../hooks/useEditorForm';

interface Props {
  editorRef: EditorRefType;
}

export default function EditorMain({ editorRef }: Props) {
  return (
    <Editor initialEditType="wysiwyg" hideModeSwitch={true} ref={editorRef} />
  );
}
