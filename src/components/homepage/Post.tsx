import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
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

const dummyUsers = [
  {
    id: '1',
    nickname: '김철수',
    email: '',
    profileImage: ''
  }
];

const getStyleByCategory = (category: CategoryType) => {
  switch (category) {
    case 'REACT':
      return { backgroundColor: '#0091ff' };
    case 'NODE':
      return { backgroundColor: '#31a431' };
    case 'AI':
      return { backgroundColor: '#40a0ee' };
    case 'ANDROID':
      return { backgroundColor: '#40ee40' };
    case 'IOS':
      return { backgroundColor: '#04080a', color: '#fff' };
    case 'SPRING':
      return { backgroundColor: '#d4ff00' };
    case 'UI/UX':
      return { backgroundColor: '#6443d0' };
    case 'UNITY':
      return { backgroundColor: '#0e2230', color: '#fff' };
    case 'ETC':
      return { backgroundColor: '#00ffb3' };
    default:
      break;
  }
};

const Post = ({ post }: Props) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    category,
    contents,
    author,
    like,
    bookmark,
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
          <Badge count={`${like?.length} likes`} showZero />
          <Viewer initialValue={contents} />
        </Card>
      </Badge.Ribbon>
    </List.Item>
  );
};

export default Post;
