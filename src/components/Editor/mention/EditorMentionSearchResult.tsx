import { PropsWithChildren } from 'react';

interface Props {
  loading: boolean;
}
export default function EditorMentionSearchResult({
  loading,
  children
}: PropsWithChildren<Props>) {
  return (
    <div>
      {loading && <Loading />}
      {!loading && children}
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}
