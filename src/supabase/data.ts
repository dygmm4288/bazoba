import { CategoryType } from './supabase.types';

const categoriesDefaultImage = [
  {
    name: 'UI/UX',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/UI/UX'
  },
  {
    name: 'AI',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/AI'
  },
  {
    name: 'ANDROID',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/ANDROID'
  },
  {
    name: 'ETC',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/ETC'
  },
  {
    name: 'IOS',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/IOS'
  },
  {
    name: 'NODE',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/NODE'
  },
  {
    name: 'REACT',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/REACT'
  },
  {
    name: 'SPRING',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/SPRING'
  },
  {
    name: 'UNITY',
    src: 'https://borxwimnmhmdodedkkpv.supabase.co/storage/v1/object/public/post_images/UNITY'
  }
];

export function getDefaultImage(category: CategoryType) {
  return categoriesDefaultImage.find((item) => item.name === category)?.src;
}
