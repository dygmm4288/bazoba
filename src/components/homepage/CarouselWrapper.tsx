import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCarousel from '../../hooks/useCarousle';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '240px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};

const CarouselWrapper = () => {
  // likes 많은 게시물 뽑아서 보여주면 좋을 듯!
  const { bestPosts } = useCarousel();
  return (
    <Carousel autoplay style={{ marginBottom: '24px' }}>
      {bestPosts?.map((post, index) => (
        <div key={post.id + index}>
          <h3 style={contentStyle}>
            <StCarouselItem to={`/detail/${post.id}`}>
              <img src={post.thumbnail_url} />
              <h4>{post.title}</h4>
            </StCarouselItem>
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;

const StCarouselItem = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 1rem;
  img {
    height: 100%;
  }
  h4 {
    position: absolute;
    bottom: -2rem;
    right: 2rem;
    font-size: 3rem;
    color: white;
  }
`;
