import '@toast-ui/editor/dist/toastui-editor.css';
import { HookCallback } from '@toast-ui/editor/types/editor';
import { Editor } from '@toast-ui/react-editor';
import { Content } from 'antd/es/layout/layout';
import { EditorRefType } from '../../hooks/useEditorForm';
import { uploadImage } from '../../supabase';

interface Props {
  editorRef: EditorRefType;
}

export default function EditorMain({ editorRef }: Props) {
  const handleImageUpload = async (blob: Blob | File, put: HookCallback) => {
    const { data, error } = await uploadImage(blob);
    if (error) {
      console.error(error);
      return;
    }
    put(data);
  };

  return (
    <Content>
      <Editor
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        ref={editorRef}
        height={'80vh'}
        hooks={{
          addImageBlobHook: handleImageUpload
        }}
      />
    </Content>
  );
}
