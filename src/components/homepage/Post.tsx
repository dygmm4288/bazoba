import '@toast-ui/editor/dist/toastui-editor.css';
import { Avatar, Badge, Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQueryUser, useAddBookmark } from '../../hooks/query/useSupabase';
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
const err = (e: never) => {};
export const getStyleByCategory = (category: CategoryType) => {
  const style = {
    fontWeight: '700',
    color: '#fff'
  };
  switch (category) {
    case 'REACT':
      return { ...style, backgroundColor: '#54b4fd' };
    case 'NODE':
      return { ...style, backgroundColor: '#31a431' };
    case 'AI':
      return { ...style, backgroundColor: '#40a0ee' };
    case 'ANDROID':
      return { ...style, backgroundColor: '#40ee40' };
    case 'IOS':
      return { ...style, backgroundColor: '#04080a' };
    case 'SPRING':
      return { ...style, backgroundColor: '#f6ff00', color: '#000' };
    case 'UI/UX':
      return { ...style, backgroundColor: '#6443d0' };
    case 'UNITY':
      return { ...style, backgroundColor: '#0e2230' };
    case 'ETC':
      return { ...style, backgroundColor: '#3b8c79' };
    default:
      err(category);
      break;
  }
};

export default Post;
