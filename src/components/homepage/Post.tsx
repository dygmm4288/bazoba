import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import db from '../../db.json';
import { PostType } from '../../supabase/supabase.types';

interface Props {
  post: PostType;
}

type User = {
  id: string;
  nickname: string;
  email?: string;
  profileImage: string;
};

const Post = ({ post }: Props) => {
  const { users } = db;
  const user = users.find((user) => user.id === post.author);

  return (
    <div style={{ backgroundColor: '#eee' }}>
      <h3>{post.title}</h3>
      <span>{post.category}</span>
      <Viewer initialValue={post.contents} />
      <img
        src={user?.profileImage}
        alt="robohash"
        width={120}
        height={120}
        style={{ borderRadius: '100%' }}
      />
    </div>
  );
};

export default Post;
