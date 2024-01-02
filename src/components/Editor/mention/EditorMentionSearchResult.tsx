import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
  loading: boolean;
}
export default function EditorMentionSearchResult({
  loading,
  children
}: PropsWithChildren<Props>) {
  return (
    <StMentionResultWrapper>
      {loading && <Loading />}
      {!loading && children}
    </StMentionResultWrapper>
  );
}
const StMentionResultWrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 1rem);
  height: 20rem;
  overflow-y: auto;
  z-index: 20;
  padding: 1rem;
  min-width: 250px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
`;

function Loading() {
  return <div>Loading...</div>;
}
