export default function () {}
/* import { useQuery } from '@tanstack/react-query';
import { Mentions } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import { fetchUserBy } from '../../supabase';
import { UserType } from '../../supabase/supabase.types';

export default function EditorMention() {
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

  const debounce = useDebounce(() => {
    refetch();
  }, 700);

  const handleSearch = (search: string) => {
    setSearchValue(search);
    debounce();
  };
  const handleChangeMentionValue = (value: string) => {
    setMentionValue(value);
  };

  const Label = ({ avatar_url, email, nickname }: UserType) => {
    return (
      <StLabelWrapper>
        <img src={avatar_url} alt={nickname} />
        <span>{email}</span>
      </StLabelWrapper>
    );
  };

  return (
    <>
      <Mentions
        onChange={handleChangeMentionValue}
        loading={isFetching}
        onSearch={handleSearch}
        options={findedUsers?.map((user) => ({
          key: user.id,
          value: user.email,
          label: Label(user)
        }))}
      />
    </>
  );
}

const StLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`; */
