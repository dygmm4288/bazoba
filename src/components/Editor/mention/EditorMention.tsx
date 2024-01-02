import { InboxOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useDebounce from '../../../hooks/useDebounce';
import { mentionedUserState } from '../../../recoil/editor';
import { fetchUserBy } from '../../../supabase';
import { UserType } from '../../../supabase/supabase.types';
import EditorMentionLabel from './EditorMentionLabel';
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.className) {
        setShowResult(false);
        return;
      }
      const isOutside = target.className.includes('mention-input');
      if (!isOutside) setShowResult(false);
      else setShowResult(true);
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isExistsFindedUsers = findedUsers && findedUsers?.length !== 0;

  return (
    <StMentionWrapper>
      <StMentionInputWrapper>
        <Flex gap="small" align="center">
          <label htmlFor="mention-input">Contributors</label>
          <StInput
            type="text"
            className="mention-input"
            id="mention-input"
            onChange={handleChangeSearchValue}
            value={searchValue}
            onFocus={() => setShowResult(true)}
            placeholder="이메일을 통해 유저를 검색할 수 있습니다!"
          />
        </Flex>
        {isShowResult && (
          <EditorMentionSearchResult loading={isFetching}>
            {findedUsers?.map((user) => (
              <EditorMentionLabel
                key={user.id}
                user={user}
                handleAddUser={handleAddUser}
              />
            ))}
            {!isExistsFindedUsers && (
              <Flex
                vertical={false}
                gap="small"
                align="center"
                style={{ height: '100%' }}
              >
                <InboxOutlined style={{ fontSize: '6rem' }} />
                <p>No data</p>
              </Flex>
            )}
          </EditorMentionSearchResult>
        )}
      </StMentionInputWrapper>

      <StMentionSelectedUserContainer>
        {selectedUsers.map((user) => (
          <StMentionSelectedUserWrapper
            key={user.id}
            onClick={() => handleDeleteUser(user.id)}
          >
            <img src={user.avatar_url} alt={`${user.nickname}'s profile`} />
            <p>{user.nickname}</p>
            <button>
              <IoIosRemoveCircle />
            </button>
          </StMentionSelectedUserWrapper>
        ))}
      </StMentionSelectedUserContainer>
    </StMentionWrapper>
  );
}
const StMentionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const StMentionInputWrapper = styled.div`
  position: relative;
`;
const StInput = styled.input`
  box-sizing: border-box;
  min-width: 300px;
  margin: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  position: relative;
  display: inline-block;
  background-color: #ffffff;
  background-image: none;
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
  &:focus {
    border-color: #d3d4fdff;
  }
`;

const StMentionSelectedUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-width: 510px;
  flex-wrap: wrap;
  padding: 1rem 0;
  box-sizing: border-box;
`;

const StMentionSelectedUserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  position: relative;
  gap: 1rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: white;
  }
  p {
    line-height: 3rem;
    margin: 0;
  }

  button {
    border-radius: 50%;
    background-color: transparent;
    border: none;
  }
  &:hover button {
    color: red;
  }
`;
