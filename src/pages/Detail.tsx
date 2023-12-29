import { useParams } from 'react-router-dom';
import DetailHeader from '../components/Detail/DetailHeader';
import DetailContent from '../components/Detail/DetailContent';
import DetailFormComment from '../components/Detail/DetailFormComment';
import DetailComment from '../components/Detail/DetailComment';

function Detail() {
  const { id } = useParams<{ id?: string }>();

  return (
    <div>
      <DetailHeader />
      <DetailContent id={id || ''} />
      <DetailFormComment id={id || ''} />
      <DetailComment id={id || ''} />
    </div>
  );
}

export default Detail;
