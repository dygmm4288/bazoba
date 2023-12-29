import { Viewer } from '@toast-ui/react-editor';
import { useQueryPost } from '../../hooks/query/useSupabase';

interface DetailContentProps {
  id: string;
}

function DetailContent({ id }: DetailContentProps) {
  const { post } = useQueryPost(id);

  return (
    <div>
      {post && (
        <div>
          <h2>제목: {post.title}</h2>
          <p>카테고리: {post.category}</p>
          <Viewer initialValue={post.contents} />
        </div>
      )}
    </div>
  );
}

export default DetailContent;
