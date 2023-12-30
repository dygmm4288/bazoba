import '@toast-ui/editor/dist/toastui-editor.css';
import { Avatar, Badge, Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQueryUser } from '../../hooks/query/useSupabase';
import {
  CategoryType,
  FetchPostsResultType
} from '../../supabase/supabase.types';

interface Props {
  // post: FetchPostsResultType;
  post: any;
}

type User = {
  id: string;
  nickname: string;
  email: string;
  avatar_url: string;
};

const Post = ({ post }: Props) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    category,
    contents,
    author,
    likes,
    bookmarks,
    thumbnail_url,
    summary
  } = post as FetchPostsResultType;
  const { user } = useQueryUser(author) as { user: User | null };
  const { Meta } = Card;
  const onPostCardClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <List.Item>
      <Badge.Ribbon
        text={category}
        style={getStyleByCategory(category as CategoryType)}
      >
        <Card
          title={title}
          hoverable
          onClick={onPostCardClickHandler}
          headStyle={{ backgroundColor: '#fff' }}
          cover={
            <div
              style={{
                backgroundImage: `url(${thumbnail_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 'inherit',
                height: '400px'
              }}
            ></div>
          }
        >
          <Meta
            title={user?.nickname}
            avatar={
              <Avatar
                size={64}
                src={
                  <img
                    src={user?.avatar_url}
                    alt={user?.nickname}
                    style={{ backgroundColor: '#eee' }}
                  />
                }
              />
            }
            description={summary}
          />
          <Badge count={`${likes?.length} Likes`} showZero />
        </Card>
      </Badge.Ribbon>
    </List.Item>
  );
};
export const getStyleByCategory = (category: CategoryType) => {
  const style = {
    fontWeight: '700'
  };
  switch (category) {
    case 'REACT':
      return { backgroundColor: '#54b4fd', color: '#fff', ...style };
    case 'NODE':
      return { backgroundColor: '#31a431', color: '#fff', ...style };
    case 'AI':
      return { backgroundColor: '#40a0ee', color: '#fff', ...style };
    case 'ANDROID':
      return { backgroundColor: '#40ee40', color: '#fff', ...style };
    case 'IOS':
      return { backgroundColor: '#04080a', color: '#fff', ...style };
    case 'SPRING':
      return { backgroundColor: '#f6ff00', color: '#000', ...style };
    case 'UI/UX':
      return { backgroundColor: '#6443d0', color: '#fff', ...style };
    case 'UNITY':
      return { backgroundColor: '#0e2230', color: '#fff', ...style };
    default:
      break;
  }
};

export default Post;
