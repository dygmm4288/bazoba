import { Carousel } from 'antd';
import { CATEGORIES } from './FilterPost';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '240px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};

const CarouselWrapper = () => {
  return (
    <Carousel autoplay style={{ marginBottom: '24px' }}>
      {CATEGORIES.map((category, idx) => (
        <div key={idx}>
          <h3 style={contentStyle}>{category}</h3>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
