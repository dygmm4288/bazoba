import styled from 'styled-components';
import { UserType } from '../../../supabase/supabase.types';

interface Props {
  user: UserType;
  handleAddUser: (user: UserType) => void;
}
export default function EditorMentionLabel({ user, handleAddUser }: Props) {
  const { avatar_url, email, nickname, id } = user;
  return (
    <StLabelWrapper key={id} onClick={() => handleAddUser(user)}>
      <img src={avatar_url} alt={nickname} />
      <span>{email}</span>
    </StLabelWrapper>
  );
}
const StLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  padding: 0.5rem;

  & > img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  &:hover {
    background-color: lightgray;
    img {
      background-color: white;
    }
  }
`;
