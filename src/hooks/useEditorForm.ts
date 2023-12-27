import { Editor } from '@toast-ui/react-editor';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { categoryState, titleState } from '../recoil/editor';

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

  useEffect(() => {
    if (!id) {
      setTitle('');
      setCategory('REACT');
      return;
    }
    (async function () {
      const post = (await fetchPost(id)) as PostType;
      console.log(post, id);
      if (!post) {
        navigate('/write');
        return;
      }
      setTitle(post.title);
      setCategory(post.category);
      if (editorRef.current) {
        editorRef.current.getInstance().setHTML(post.contents);
      }
    })();
  }, [id]);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editorRef.current);
    if (editorRef.current) {
      console.log(editorRef.current.getInstance().getHTML());
    }
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value as CategoryType);

  return {
    handleForm,
    editorRef,
    handleTitle,
    handleCategory,
    title,
    category
  };
}
const dummy = [
  {
    id: 'post1',
    title: 'Title 1',
    contents:
      '<h1>Lorem ipsum dolor sit amet, consectetur</h1><p>저는 이진호입니다</p>',
    email: 'email1@example.com',
    author: 'Author 1',
    category: 'REACT'
  },
  {
    id: 'post2',
    title: 'Title 2',
    contents: '<p>Adipiscing elit, sed do eiusmod tempor</p>',
    email: 'email2@example.com',
    author: 'Author 2',
    category: 'NODE'
  },
  {
    id: 'post3',
    title: 'Title 3',
    contents: '<p>Incididunt ut labore et dolore magna</p>',
    email: 'email3@example.com',
    author: 'Author 3',
    category: 'SPRING'
  },
  {
    id: 'post4',
    title: 'Title 4',
    contents: '<p>Aliqua. Ut enim ad minim veniam</p>',
    email: 'email4@example.com',
    author: 'Author 4',
    category: 'AI'
  },
  {
    id: 'post5',
    title: 'Title 5',
    contents: '<p>Quis nostrud exercitation ullamco laboris</p>',
    email: 'email5@example.com',
    author: 'Author 5',
    category: 'UI/UX'
  },
  {
    id: 'post6',
    title: 'Title 6',
    contents: '<p>Nisi ut aliquip ex ea commodo</p>',
    email: 'email6@example.com',
    author: 'Author 6',
    category: 'ANDROID'
  },
  {
    id: 'post7',
    title: 'Title 7',
    contents: '<p>Consequat. Duis aute irure dolor in</p>',
    email: 'email7@example.com',
    author: 'Author 7',
    category: 'UNITY'
  },
  {
    id: 'post8',
    title: 'Title 8',
    contents: '<p>Reprehenderit in voluptate velit esse cillum</p>',
    email: 'email8@example.com',
    author: 'Author 8',
    category: 'IOS'
  },
  {
    id: 'post9',
    title: 'Title 9',
    contents: '<p>Dolore eu fugiat nulla pariatur. Excepteur</p>',
    email: 'email9@example.com',
    author: 'Author 9',
    category: 'ETC'
  },
  {
    id: 'post10',
    title: 'Title 10',
    contents: '<p>Sint occaecat cupidatat non proident</p>',
    email: 'email10@example.com',
    author: 'Author 10',
    category: 'REACT'
  }
];
function fetchPost(id: string) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(dummy.find((data) => data.id === id)), 1000)
  );
}
