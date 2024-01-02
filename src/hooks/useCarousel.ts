import { useQuery } from '@tanstack/react-query';
import { db } from '../supabase';
import { CategoryType, PostType } from '../supabase/supabase.types';

const tracks: CategoryType[] = [
  'AI',
  'ANDROID',
  'ETC',
  'IOS',
  'NODE',
  'REACT',
  'SPRING',
  'UI/UX',
  'UNITY'
];

export default function useCarousel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['carousle'],
    queryFn: () => fetchBestPosts(),
    staleTime: Infinity
  });

  return { bestPosts: data };
}
type PostTypeWithLike = PostType & { likes: { count: number }[] };
async function fetchBestPosts() {
  const compare = (a: PostTypeWithLike, b: PostTypeWithLike): number => {
    return b['likes'][0].count - a['likes'][0].count;
  };
  const getBestPost = (posts: PostTypeWithLike[]): PostTypeWithLike => {
    posts.sort(compare);
    return posts[0];
  };
  try {
    const bestLikes = await fetchBestPostByCategory();
    const bestTracksLikes = await Promise.all(
      tracks.map(fetchBestPostByCategory)
    );

    return [bestLikes, ...bestTracksLikes].map(getBestPost).filter(Boolean);
  } catch (err) {
    throw Promise.reject(err);
  }
}
async function fetchBestPostByCategory(category?: CategoryType) {
  const q = db.from('posts').select('*,likes(count)');
  if (category) q.eq('category', category);
  const { data, error } = await q.returns<PostTypeWithLike[]>();
  if (error) return Promise.reject(error);
  return data;
}
