import { Editor } from '@toast-ui/react-editor';
import { message } from 'antd';
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
import { addPost, uploadImage } from '../supabase';
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
  const [thumbnailUrl, setThumbnailUrl] = useRecoilState(thumbnailUrlState);
  const setLoading = useSetRecoilState(isLoadingState);
  const auth = useRecoilValue(loginState);
  const summary = useRecoilValue(summaryState);

  const { post, error } = useQueryPost(id || '');

  const [isPostMode, setPostMode] = useState(false);

  const navigate = useNavigate();

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
  const handleTogglePostMode = (nextPostMode?: boolean) => () => {
    if (nextPostMode === undefined) {
      setPostMode(!isPostMode);
      return;
    }

    setPostMode(nextPostMode);
  };
  const handleAction = async (file: File) => {
    setLoading(true);
    const { data, error } = await uploadImage(file);
    setLoading(false);

    if (error) {
      try {
        message.error('이미지 업로드에 실패했습니다.');
      } catch (err) {
        console.error(error, err);
      }
      return;
    }

    setThumbnailUrl(data);
  };

  return {
    handleForm,
    editorRef,
    handleTitle,
    handleCategory,
    isPostMode,
    handleTogglePostMode,
    handleAction
  };
}
