import '@toast-ui/editor/dist/toastui-editor.css';
import { HookCallback } from '@toast-ui/editor/types/editor';
import { Editor } from '@toast-ui/react-editor';
import { Content } from 'antd/es/layout/layout';
import { EditorRefType } from '../../hooks/useEditorForm';
import { db } from '../../supabase';

interface Props {
  editorRef: EditorRefType;
}

export default function EditorMain({ editorRef }: Props) {
  const handleImageUpload = async (blob: Blob | File, put: HookCallback) => {
    const URL =
      'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/';
    const { data, error } = await db.storage
      .from('post_images')
      .upload(window.URL.createObjectURL(blob), blob);
    if (error) {
      console.error(error);
    } else {
      put(URL + data.path);
    }
  };

  return (
    <Content>
      <Editor
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        ref={editorRef}
        height={'1200px'} // TODO : 임시로 넣은 값
        hooks={{
          addImageBlobHook: handleImageUpload
        }}
      />
    </Content>
  );
}
