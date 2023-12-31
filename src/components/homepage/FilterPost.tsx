import { Button, ButtonProps, Tooltip } from 'antd';
import {
  complement,
  concat,
  curry,
  equals,
  filter,
  flip,
  includes
} from 'ramda';
import { ReactNode } from 'react';
import {
  DiAndroid,
  DiApple,
  DiDjango,
  DiNodejs,
  DiPython,
  DiReact,
  DiUnitySmall
} from 'react-icons/di';
import { FaUserCog } from 'react-icons/fa';
import { SiSpring } from 'react-icons/si';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { StSection } from '../../GlobalStyle';
import { postCategoryFilterState } from '../../recoil/filter';
import { CategoryType } from '../../supabase/supabase.types';

const FilterPost = () => {
  const [postCategoryFilter, setPostCategoryFilter] = useRecoilState(
    postCategoryFilterState
  );

  const handleAddFilter = (category: CategoryType, index: number) => {
    const getNextCategory = existsCategory(postCategoryFilter, category)
      ? removeCategory
      : addCategory;

    setPostCategoryFilter(getNextCategory(postCategoryFilter, category));
  };

  const handleClearFilter = () => {
    setPostCategoryFilter([]);
  };

  return (
    <StSection>
      <h2>트랙별로 모아보기</h2>
      <Tooltip title={'보고싶은 트랙의 프로젝트만 모아보세요!'} placement="top">
        <StFilterContainer>
          <ul>
            {CATEGORIES.map((category, idx) => (
              <li key={idx}>
                <StFilterButton
                  onClick={() => handleAddFilter(category, idx)}
                  $isActive={postCategoryFilter.includes(category)}
                  $category={category}
                  icon={getIconByCategory(category)}
                >
                  {category}
                </StFilterButton>
              </li>
            ))}
          </ul>
        </StFilterContainer>
      </Tooltip>
      {postCategoryFilter.length > 0 && (
        <StFilterClearButton type="primary" danger onClick={handleClearFilter}>
          Clear All
        </StFilterClearButton>
      )}
    </StSection>
  );
};

export default FilterPost;

const StFilterContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 12px;
  background-color: #eee;
  border-radius: 12px 18px;
  list-style: none;
  position: relative;
  overflow: scroll;

  ul {
    display: flex;
    gap: 12px;
    position: relative;
    align-items: center;
    justify-content: center;
  }
`;

interface StFilterButtonProps extends ButtonProps {
  $isActive?: boolean;
  $category?: CategoryType;
}

const StFilterButton = styled(Button)<StFilterButtonProps>`
  ${(props) =>
    props.$isActive
      ? `color: #fff; background: ${CATEGORY_COLOR_MAP[props.$category!]} `
      : `color: #000; background: #fff, border: 1px solid ${
          CATEGORY_COLOR_MAP[props.$category!]
        }`};
  box-sizing: border-box;
  width: 96px;
  height: 96px;
  position: relative;
  transition: background 0.2s ease-in-out;

  span.ant-btn-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
  }

  svg {
    font-size: 48px;
  }
  span {
    opacity: 0;
    font-weight: 700;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    color: black !important;
    border-color: #ddd !important;
  }
  &:hover span {
    color: ${(props) => (props.$isActive ? '#fff' : '#000')};
    opacity: 1;
  }
  &:hover span.ant-btn-icon {
    opacity: 0;
  }
`;

const StFilterClearButton = styled(Button)`
  position: absolute;
  top: -2px;
  right: 12px;
`;

const existsCategory = curry(flip(includes));
const addCategory = curry((categories, category) =>
  concat(categories, [category])
);
const removeCategory = curry((categories, category) =>
  filter(complement(equals(category)), categories)
);

const getIconByCategory = (category: CategoryType): ReactNode => {
  switch (category) {
    case 'REACT':
      return <DiReact style={{ width: '64px', height: '64px' }} />;
    case 'NODE':
      return <DiNodejs style={{ width: '64px', height: '64px' }} />;
    case 'AI':
      return (
        <>
          <DiDjango style={{ width: '38px', height: '38px' }} />
          <DiPython style={{ width: '32px', height: '42px' }} />
        </>
      );
    case 'ANDROID':
      return <DiAndroid style={{ width: '44px', height: '44px' }} />;
    case 'IOS':
      return <DiApple style={{ width: '48px', height: '48px' }} />;
    case 'SPRING':
      return <SiSpring style={{ width: '32px', height: '32px' }} />;
    case 'UI/UX':
      return <FaUserCog style={{ width: '40px', height: '40px' }} />;
    case 'UNITY':
      return <DiUnitySmall style={{ width: '48px', height: '48px' }} />;
    default:
      break;
  }
};

export const CATEGORIES: CategoryType[] = [
  'REACT',
  'NODE',
  'SPRING',
  'AI',
  'UI/UX',
  'ANDROID',
  'UNITY',
  'IOS'
];

const CATEGORY_COLOR_MAP: { [key in CategoryType]: string } = {
  REACT: 'linear-gradient(45deg, #063f66, #095a91, #0b74bb, #0e8fe6)',
  NODE: 'linear-gradient(45deg, #145202, #4abf2a)',
  SPRING: 'linear-gradient(45deg, #1e8617, #50ab49, #b6de18)',
  AI: 'linear-gradient(45deg, #f7c965, #eaad26, #f29e50, #ff7f4d)',
  'UI/UX': 'linear-gradient(45deg, #443d64, #6582c6)',
  ANDROID:
    'linear-gradient(45deg, #60eb3d, #42b325, #397d28, #26531a, #12280d)',
  UNITY: 'linear-gradient(45deg, #c6c2ff, #8664e3, #4718c7, #100442)',
  IOS: 'linear-gradient(45deg, #404040, #212121)',
  ETC: '#color1'
};
