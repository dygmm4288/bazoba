import { Input, Select, Space } from 'antd';
import { ChangeEvent } from 'react';

interface Props {
  title: string;
  category: string;
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
    <Space>
      <Input
        style={{ fontWeight: 'bold', fontSize: '1.75rem' }}
        bordered={false}
        onChange={handleTitle}
        value={title}
        required
        placeholder="제목을 입력하세요."
        size="large"
      />
      <Select
        onChange={handleCategory}
        value={category as any}
        style={{ width: 120 }}
        options={categories.map((category) => ({
          label: category,
          value: category
        }))}
        size="large"
      />
    </Space>
  );
}
