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
  const filterData = (e: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <div>
      <ul>
        {CATEGORIES.map((category, idx) => (
          <li key={idx}>
            <button key={idx} onClick={filterData}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPost;
