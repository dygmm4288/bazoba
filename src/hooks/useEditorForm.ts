import { Editor } from '@toast-ui/react-editor';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../recoil/auth';
import { categoryState, titleState } from '../recoil/editor';
import { addPost } from '../supabase';
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
        email: auth.email
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

  return {
    handleForm,
    editorRef,
    handleTitle,
    handleCategory,
    title,
    category
  };
}
