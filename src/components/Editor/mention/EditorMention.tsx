import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useDebounce from '../../../hooks/useDebounce';
import { mentionedUserState } from '../../../recoil/editor';
import { fetchUserBy } from '../../../supabase';
import { UserType } from '../../../supabase/supabase.types';
import EditorMentionSearchResult from './EditorMentionSearchResult';

export default function EditorMention() {
  const [selectedUsers, setSelectedUsers] = useRecoilState(mentionedUserState);
  const [isShowResult, setShowResult] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const {
    isFetching,
    data: findedUsers,
    refetch
  } = useQuery({
    queryKey: ['findUser', searchValue],
    queryFn: ({ queryKey }) => fetchUserBy(queryKey[1]),
    enabled: false
  });
  const debounceFetchUsers = useDebounce(() => {
    refetch();
  }, 700);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debounceFetchUsers();
  };
  const handleAddUser = (newUser: UserType) => {
    setSearchValue('');
    const index = selectedUsers.findIndex((user) => user.id === newUser.id);
    const isExistsSelectedUser = index !== -1;
    if (isExistsSelectedUser) return;

    setSelectedUsers((prev) => [...prev, newUser]);
  };
  const handleDeleteUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const Label = (user: UserType) => {
    const { avatar_url, email, nickname, id } = user;
    return (
      <StLabelWrapper key={id} onClick={() => handleAddUser(user)}>
        <img src={avatar_url} alt={nickname} />
        <span>{email}</span>
      </StLabelWrapper>
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOutside = target.className === 'mention-input';
      if (!isOutside) setShowResult(false);
      else setShowResult(true);
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <input
        type="text"
        className="mention-input"
        onChange={handleChangeSearchValue}
        value={searchValue}
        onFocus={() => setShowResult(true)}
      />
      {isShowResult && (
        <EditorMentionSearchResult loading={isFetching}>
          {findedUsers?.map(Label)}
          {findedUsers?.length === 0 && <StEmptyResult>No data</StEmptyResult>}
        </EditorMentionSearchResult>
      )}
      <ul>
        {selectedUsers.map((user) => (
          <li key={user.id}>
            <p>{user.email}</p>
            <button onClick={() => handleDeleteUser(user.id)}>
              <IoIosRemoveCircle />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
const StEmptyResult = styled.div``;

const StLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  &:hover {
    background-color: lightgray;
  }
`;
