import { Button, ButtonProps } from 'antd';
import { ReactNode, useState } from 'react';
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
import { postCategoryFilterState } from '../../recoil/filter';
import { CategoryType } from '../../supabase/supabase.types';

const CATEGORIES: CategoryType[] = [
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
  REACT: '#4790f6',
  NODE: '#83BA63',
  SPRING: '#64c622',
  AI: '#e4eb59',
  'UI/UX': '#d8a4ff',
  ANDROID: '#A4C639',
  UNITY: '#bcadcd',
  IOS: '#e5ebf9',
  ETC: '#color1'
};
interface StFilterButtonProps extends ButtonProps {
  $isActive?: boolean;
  $category?: CategoryType;
}

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

const FilterPost = () => {
  const [postCategoryFilter, setPostCategoryFilter] = useRecoilState(
    postCategoryFilterState
  );
  const [activeButtons, setActiveButtons] = useState<boolean[]>(
    Array(CATEGORIES.length).fill(false)
  );

  const onFilterBtnClickHandler = (category: CategoryType, index: number) => {
    // setFilter(category);
    setActiveButtons((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    if (postCategoryFilter.includes(category)) {
      setPostCategoryFilter(
        postCategoryFilter.filter((item) => item !== category)
      );
    } else {
      setPostCategoryFilter([...postCategoryFilter, category]);
    }
    console.log(postCategoryFilter);
  };

  const onFilterClearBtnClickHandler = () => {
    setActiveButtons((prevState) => {
      const newState = prevState.map((state) => (state = false));
      return newState;
    });
    setPostCategoryFilter([]);
  };

  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '12px',
          margin: '0 auto',
          width: 'fit-content',
          padding: '0',
          position: 'relative'
        }}
      >
        {CATEGORIES.map((category, idx) => (
          <li key={idx}>
            <StFilterButton
              key={idx}
              onClick={() => onFilterBtnClickHandler(category, idx)}
              style={{ fontWeight: '700' }}
              $isActive={postCategoryFilter.includes(category)}
              $category={category}
              icon={getIconByCategory(category)}
            >
              {category}
            </StFilterButton>
          </li>
        ))}
        <StFilterClearButton
          type={postCategoryFilter.length ? 'primary' : 'default'}
          danger
          onClick={onFilterClearBtnClickHandler}
        >
          CLEAR
        </StFilterClearButton>
      </ul>
    </div>
  );
};

export default FilterPost;

const StFilterButton = styled(Button)<StFilterButtonProps>`
  ${(props) =>
    props.$isActive
      ? `background-color: ${CATEGORY_COLOR_MAP[props.$category!]} `
      : ` border: 1px solid ${CATEGORY_COLOR_MAP[props.$category!]}`};
  box-sizing: border-box;
  /* min-width: 80px; */
  width: 100px;
  height: 100px;

  span.ant-btn-icon {
    /* position: absolute; */
    top: 12%;
    left: 0%;
    display: block;
    width: 100%;
  }

  svg {
    font-size: 48px;
  }
  span {
    display: none;
  }

  &:hover {
    color: black !important;
    border-color: white !important;
  }
  &:hover span {
    display: block;
  }
  &:hover span.ant-btn-icon {
    display: none;
  }
`;

const StFilterClearButton = styled(Button)`
  position: absolute;
  top: -42px;
  right: 0;
`;
