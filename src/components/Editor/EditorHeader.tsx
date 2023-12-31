import { Input, Select, Space } from 'antd';
import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { categoryState, titleState } from '../../recoil/editor';
import { CategoryType } from '../../supabase/supabase.types';

interface Props {
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

export default function EditorHeader({ handleCategory, handleTitle }: Props) {
  const title = useRecoilValue(titleState);
  const category = useRecoilValue(categoryState);

  return (
    <Space>
      <Input
        style={{ fontWeight: 'bold', fontSize: '1.75rem' }}
        bordered={false}
        onChange={handleTitle}
        value={title}
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
