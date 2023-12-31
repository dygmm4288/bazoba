import { Button, ButtonProps } from 'antd';
import {
  complement,
  concat,
  curry,
  equals,
  filter,
  flip,
  includes
} from 'ramda';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
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
              onClick={() => handleAddFilter(category, idx)}
              style={{ fontWeight: '700' }}
              $isActive={postCategoryFilter.includes(category)}
              $category={category}
            >
              {category}
            </StFilterButton>
          </li>
        ))}
        <Button
          type={postCategoryFilter.length ? 'primary' : 'default'}
          danger
          onClick={handleClearFilter}
        >
          CLEAR
        </Button>
      </ul>
    </div>
  );
};

export default FilterPost;

const existsCategory = curry(flip(includes));
const addCategory = curry((categories, category) =>
  concat(categories, [category])
);
const removeCategory = curry((categories, category) =>
  filter(complement(equals(category)), categories)
);

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
