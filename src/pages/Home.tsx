import { FloatButton } from 'antd';
import CarouselWrapper from '../components/homepage/CarouselWrapper';
import FilterPost from '../components/homepage/FilterPost';
import PostList from '../components/homepage/PostList';

const Home = () => {
  return (
    <>
      <CarouselWrapper />
      <FilterPost />
      <PostList />
      <FloatButton.BackTop />
    </>
  );
};

export default Home;
