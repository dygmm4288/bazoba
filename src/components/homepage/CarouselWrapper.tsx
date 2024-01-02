import { Carousel } from 'antd';

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
  return (
    <Carousel autoplay style={{ marginBottom: '24px' }}>
      <div>
        <h3 style={contentStyle}>업데이트 예정!</h3>
      </div>
    </Carousel>
  );
};

export default CarouselWrapper;
