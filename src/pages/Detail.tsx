import { useParams } from 'react-router-dom';
import DetailContent from '../components/Detail/DetailContent';
import DetailFormComment from '../components/Detail/DetailFormComment';
import DetailComment from '../components/Detail/DetailComment';
import DetailReviewComment from '../components/Detail/DetailReviewComment';
import DetailActions from '../components/Detail/DetailActions';
import styled from 'styled-components';

import { VscFeedback } from 'react-icons/vsc';
import { FaRegCommentDots } from 'react-icons/fa';
import { Tabs } from 'antd';

function Detail() {
  const { id } = useParams<{ id?: string }>();

  const tabs = [
    {
      key: '1',
      label: 'Comments',
      content: <DetailComment id={id || ''} />,
      icon: <FaRegCommentDots />
    },
    {
      key: '2',
      label: 'Review',
      content: <DetailReviewComment id={id || ''} />,
      icon: <VscFeedback />
    }
  ];

  return (
    <div>
      <DetailContent id={id || ''} />
      <DetailActions id={id || ''} />
      <DetailFormComment id={id || ''} />
      <TabsContainer>
        <Tabs defaultActiveKey="1">
          {tabs.map((tab) => (
            <Tabs.TabPane
              tab={
                <span>
                  {tab.label}&nbsp;
                  {tab.icon}
                </span>
              }
              key={tab.key}
            >
              {tab.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </TabsContainer>
    </div>
  );
}

export default Detail;

const TabsContainer = styled.div`
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  margin-top: 20px;
`;
