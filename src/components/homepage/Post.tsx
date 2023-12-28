import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import { Avatar, Badge, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import db from '../../db.json';
import { FetchPostsResultType } from '../../supabase/supabase.types';

interface Props {
  // post: FetchPostsResultType;
  post: any;
}

type User = {
  id: string;
  nickname: string;
  email?: string;
  profileImage: string;
};

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
  const { users } = db;
  const { title, category, contents, like, bookmark } =
    post as FetchPostsResultType;
  const { Meta } = Card;
  const user = users.find((user) => user.id === post.author);
  const onPostCardClickHandler = () => {
    navigate('/');
  };

  return (
    <Badge.Ribbon text={category} style={getStyleByCategory(category)}>
      <Card
        title={title}
        hoverable
        onClick={onPostCardClickHandler}
        headStyle={{ backgroundColor: '#fff' }}
        cover={
          <div style={{ backgroundColor: '#ffea00', height: '200px' }}>
            placeholder for Thumbnail
          </div>
        }
      >
        <Meta
          title={title}
          avatar={
            user?.profileImage ? (
              <Avatar
                size={64}
                src={
                  <img
                    src={user?.profileImage}
                    alt={user?.nickname}
                    style={{ backgroundColor: '#eee' }}
                  />
                }
              />
            ) : (
              <Avatar size={64} style={{ backgroundColor: '#87d068' }}>
                U
              </Avatar>
            )
          }
          description={
            '여기에 프로젝트에 대한 간략한 설명이 들어가면 좋을 것 같아요'
          }
        />
        <Viewer initialValue={contents} />
        <Badge count={`${like.length} likes`} showZero />
      </Card>
    </Badge.Ribbon>
  );
};

export default Post;

/* 
>>> TODO
>>> 1. Post table에 summary 라는 필드가 있으면 좋을 것 같다.
>>> 2. 에디터 말고 글 등록에서 사진을 몇 개 받으면 좋지 않을까? 아니면 글을 등록할 때 넣은 사진에서 사진 데이터만 뽑아낼 수 있으면 좋을 것 같다.
>>> 

*/
