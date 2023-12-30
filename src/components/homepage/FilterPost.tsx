import { Button, ButtonProps } from 'antd';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { filterArrayState } from '../../recoil/filter';
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
  AI: '#f0f586',
  'UI/UX': '#4b5256',
  ANDROID: '#A4C639',
  UNITY: '#808080',
  IOS: '#e5ebf9',
  ETC: '#color1'
};
interface StFilterButtonProps extends ButtonProps {
  $isActive?: boolean;
  $category?: CategoryType;
}

const FilterPost = () => {
  const [filterArray, setFilterArray] = useRecoilState(filterArrayState);
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
    if (filterArray.includes(category)) {
      setFilterArray(filterArray.filter((item) => item !== category));
    } else {
      setFilterArray([...filterArray, category]);
    }
    console.log(filterArray);
  };

  const onFilterClearBtnClickHandler = () => {
    setActiveButtons((prevState) => {
      const newState = prevState.map((state) => (state = false));
      return newState;
    });
    setFilterArray([]);
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
          padding: '0'
        }}
      >
        {CATEGORIES.map((category, idx) => (
          <li key={idx}>
            <StFilterButton
              key={idx}
              onClick={() => onFilterBtnClickHandler(category, idx)}
              style={{ fontWeight: '700' }}
              $isActive={filterArray.includes(category)}
              $category={category}
            >
              {category}
            </StFilterButton>
          </li>
        ))}
        <Button
          type={filterArray.length ? 'primary' : 'default'}
          danger
          onClick={onFilterClearBtnClickHandler}
        >
          CLEAR
        </Button>
      </ul>
    </div>
  );
};

export default FilterPost;

// const StFilterButton = styled(Button)<StFilterButtonProps>`
//   background-color: ${(props) =>
//     props.$isActive
//       ? '#eee'
//       : '#f00'}
// `;
const StFilterButton = styled(Button)<StFilterButtonProps>`
  ${(props) =>
    props.$isActive
      ? `background-color: ${CATEGORY_COLOR_MAP[props.$category!]} `
      : ` border: 1px solid ${CATEGORY_COLOR_MAP[props.$category!]}`};
  box-sizing: border-box;
  &:hover {
    color: black !important;
    border-color: white !important;
  }
`;

// background-color: ${(props) =>
//   props.$isActive
//     ? FILTER_BG_MAP[props.$category!][1]
//     : FILTER_BG_MAP[props.$category!][0]};
