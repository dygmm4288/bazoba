import { Editor } from '@toast-ui/react-editor';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from '../recoil/auth';
import {
  categoryState,
  isLoadingState,
  summaryState,
  thumbnailUrlState,
  titleState
} from '../recoil/editor';
import { addPost, db } from '../supabase';
import { CategoryType } from '../supabase/supabase.types';
import { TablesInsert } from '../supabase/supabaseSchema.types';
import { useQueryPost } from './query/useSupabase';

export type EditorRefType = {
  current: Editor | null;
};

type EditorFormType = {
  id?: string;
};

let editorRef: EditorRefType = { current: null };

export default function useEditorForm({ id }: EditorFormType) {
  const [title, setTitle] = useRecoilState(titleState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isPostMode, setPostMode] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useRecoilState(thumbnailUrlState);
  const summary = useRecoilValue(summaryState);
  const setLoading = useSetRecoilState(isLoadingState);

  const navigate = useNavigate();
  const { post, error } = useQueryPost(id || '');
  const auth = useRecoilValue(loginState);
  useEffect(() => {
    if (!id) {
      initializeEditor();
      return;
    }
    if (post) {
      setTitle(post?.title);
      setCategory(post?.category as CategoryType);
    }
    return () => {
      initializeEditor();
    };
  }, [post]);

  useEffect(() => {
    if (error) {
      navigate('/write');
    }
  }, [error]);

  function initializeEditor() {
    setTitle('');
    setCategory('REACT');
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editorRef.current && auth) {
      const contents = editorRef.current.getInstance().getHTML();
      const newPost: TablesInsert<'posts'> = {
        author: auth.id,
        category,
        contents,
        title,
        email: auth.email,
        summary,
        thumbnail_url: thumbnailUrl!
      };
      try {
        await addPost(newPost);
        console.log('해치움');
      } catch (error) {
        console.log('못 해치움 ㅜ');
      }

      return;
    }
    alert('에디터가 제대로 로딩되지 않았습니다.');
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement> | CategoryType) => {
    if (typeof e === 'string') {
      setCategory(e);
      return;
    }
    setCategory(e.target.value as CategoryType);
  };
  const handleTogglePostMode = () => {
    setPostMode(!isPostMode);
  };
  const handleChangeThumbnail: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const URL =
      'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/';
    console.log('file status is : ', info.file.status);
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      console.log('done');
    }
  };

  const handleAction = async (file: RcFile) => {
    const BASE_URL =
      'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/';
    setLoading(true);
    const { data, error } = await db.storage
      .from('post_images')
      .upload(window.URL.createObjectURL(file), file);
    if (error) {
      console.error(error);
    } else {
      setThumbnailUrl(BASE_URL + data.path);
    }
    setLoading(false);
  };

  return {
    handleForm,
    editorRef,
    handleTitle,
    handleCategory,
    isPostMode,
    handleTogglePostMode,
    handleChangeThumbnail,
    handleAction
  };
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
