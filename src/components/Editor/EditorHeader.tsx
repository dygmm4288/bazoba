/* import { ChangeEvent } from 'react';

interface Props {
  title: string;
  category: CategoryType;
  handleTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const categories: CategoryType[] = [
  'REACT',
  'AI',
  'ANDROID',
  'ETC',
  'SPRING',
  'UI/UX',
  'UNITY',
  'IOS',
  'NODE'
];

export default function EditorHeader({
  handleCategory,
  handleTitle,
  title,
  category
}: Props) {
  return (
    <header>
      <input
        onChange={handleTitle}
        value={title}
        required
        placeholder="제목을 입력하세요"
      />
      <select onChange={handleCategory} value={category} required>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </header>
  );
}
 */

export default function EditorHeader() {
  return <div>EditorHeader</div>;
}
