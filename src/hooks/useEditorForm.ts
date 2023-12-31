import { Editor } from '@toast-ui/react-editor';
import { message } from 'antd';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { extractText } from '../lib/extractText';
import { loginState } from '../recoil/auth';
import {
  categoryState,
  isLoadingState,
  summaryState,
  thumbnailUrlState,
  titleState
} from '../recoil/editor';
import { addPost, uploadImage } from '../supabase';
import { getDefaultImage } from '../supabase/data';
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
  const [summary, setSummary] = useRecoilState(summaryState);
  const auth = useRecoilValue(loginState);

  const { post, error } = useQueryPost(id || '');

  const [isPostMode, setPostMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isEditMode = !!id;
    if (!isEditMode) {
      initializeEditorState();
      return;
    }
    if (post) {
      setTitle(post?.title);
      setCategory(post?.category as CategoryType);
    }
    return () => {
      if (!!title || !!thumbnailUrl || !!summary) {
        return;
      }
      initializeEditorState();
    };
  }, [post]);

  useEffect(() => {
    if (error) {
      navigate('/write');
    }
  }, [error]);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editorRef.current && auth) {
      const contents = editorRef.current.getInstance().getHTML();
      if (!extractText(contents).trim() || !title) {
        message.error('제목과 내용을 모두 입력해주세요');
        setPostMode(false);
        return;
      }

      const newPost: TablesInsert<'posts'> = {
        author: auth.id,
        category,
        contents,
        title,
        email: auth.email,
        summary: summary || extractText(contents).slice(0, 150),
        thumbnail_url: thumbnailUrl || getDefaultImage(category)!
      };
      try {
        await addPost(newPost);
        initializeEditorState();
        navigate('/');
      } catch (error) {
        console.error('등록하는 동안 에러 발생');
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
      return error;
    }

    setThumbnailUrl(data);
    return data;
  };

  function initializeEditorState() {
    setTitle('');
    setCategory('REACT');
    setLoading(false);
    setThumbnailUrl(null);
    setSummary('');
  }

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
