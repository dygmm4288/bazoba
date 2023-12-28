import FilterPost from '../components/homepage/FilterPost';
import PostList from '../components/homepage/PostList';
import Header from '../components/layout/Header';

const Home = () => {
  return (
    <main style={{ backgroundColor: '#eee' }}>
      <Header />
      <FilterPost />
      <PostList />
    </main>
  );
};

export default Home;
