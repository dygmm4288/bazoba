import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Content } from 'antd/es/layout/layout';
import { EditorRefType } from '../../hooks/useEditorForm';

interface Props {
  editorRef: EditorRefType;
}

export default function EditorMain({ editorRef }: Props) {
  return (
    <Content>
      <Editor initialEditType="wysiwyg" hideModeSwitch={true} ref={editorRef} />
    </Content>
  );
}
