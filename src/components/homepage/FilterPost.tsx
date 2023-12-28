import { Button } from 'antd';
import { useRecoilState } from 'recoil';
import { filterState } from '../../recoil/filter';
import { CategoryType } from '../../supabase/supabase.types';

const CATEGORIES: CategoryType[] = [
  'REACT',
  'NODE',
  'SPRING',
  'AI',
  'UI/UX',
  'ANDROID',
  'UNITY',
  'IOS',
  'ETC'
];

const FilterPost = () => {
  const [_, setFilter] = useRecoilState(filterState);
  const onFilterBtnClickHandler = (category: string) => {
    setFilter(category);
  };

  // console.log(filter);
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
            <Button key={idx} onClick={() => onFilterBtnClickHandler(category)}>
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPost;
