import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { message } from 'antd';
import { assoc } from 'ramda';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import addUniqItemById from '../lib/addUniqItemByCondition';
import { extractText } from '../lib/extractText';
import { loginState } from '../recoil/auth';
import {
  categoryState,
  isLoadingState,
  mentionedUserState,
  summaryState,
  thumbnailUrlState,
  titleState
} from '../recoil/editor';
import {
  addCoAuthor,
  addPost,
  removeCoAuthor,
  updatePost,
  uploadImage
} from '../supabase';
import { getDefaultImage } from '../supabase/data';
import { CategoryType } from '../supabase/supabase.types';
import { TablesInsert } from '../supabase/supabaseSchema.types';
import { POST_QUERY_KEY } from './query/query.keys';
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
  const [selectedUsers, setSelectedUsers] = useRecoilState(mentionedUserState);

  const { post, error: errorForPost } = useQueryPost(id || '');
  const client = useQueryClient();

  const [isPostMode, setPostMode] = useState(false);

  const navigate = useNavigate();

  const isCanAccess = !post?.author || !auth || post?.author !== auth?.id;
  const isWorkingEdit = !!title || !!thumbnailUrl || !!summary;

  useEffect(() => {
    const isEditMode = !!id;
    if (!isEditMode) {
      initializeEditorState();
      return;
    }
    if (post) {
      if (isCanAccess) {
        message.error('권한이 없습니다.');
        navigate('/');
        return;
      }
      setTitle(post?.title);
      setCategory(post?.category as CategoryType);
      setSummary(post?.summary);
      editorRef.current?.getInstance().setHTML(post?.contents);
      setThumbnailUrl(post?.thumbnail_url);
      setSelectedUsers(
        post?.co_authors.map((coAuthor) => coAuthor.users!) || []
      );
    }
    return () => {
      if (isWorkingEdit) {
        return;
      }
      initializeEditorState();
    };
  }, [post]);

  useEffect(() => {
    if (errorForPost) {
      navigate('/write');
    }
  }, [errorForPost]);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editorRef.current && auth) {
      const contents = editorRef.current.getInstance().getHTML();
      if (!extractText(contents).trim() || !title) {
        message.error('제목과 내용을 모두 입력해주세요');
        setPostMode(false);
        return;
      }

      const postAction = !!!post?.id ? addPost : updatePost;
      const assocId = post?.id ? assoc('id', post?.id) : (a: any) => a;

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
        const newPostResponse = await postAction(assocId(newPost));
        client.invalidateQueries({
          queryKey: POST_QUERY_KEY(newPostResponse.id)
        });
        const currentAuthor = {
          id: auth.id,
          avatar_url: auth.user_metadata.avatar_url,
          nickname: auth.user_metadata?.nickname || '',
          email: auth.email
        };

        const newCoAuthors = addUniqItemById(selectedUsers, currentAuthor).map(
          (user) => ({
            postId: newPostResponse.id,
            userId: user.id
          })
        );

        await syncCoAuthor(newCoAuthors, post?.id);

        initializeEditorState();
        navigate(`/detail/${newPostResponse.id}`);
      } catch (error) {
        console.error('등록하는 동안 에러 발생', error);
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
    setSelectedUsers([]);
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

async function syncCoAuthor(
  newCoAuthors: TablesInsert<'co_authors'>[],
  postId?: string
) {
  if (postId) {
    await removeCoAuthor(postId);
  }
  await addCoAuthor(newCoAuthors);
}
