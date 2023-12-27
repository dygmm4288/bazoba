import { useEffect } from 'react';
import { useQueryPost, useQueryPosts } from '../hooks/useSupabase';

export default function Main() {
  const { posts, refetchPosts } = useQueryPosts();

  const { post } = useQueryPost('a38a1eb0-e793-472b-9f9a-f5dbd608afa8');

  console.log('data is : ', post);
  useEffect(() => {
    refetchPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      {/* {posts?.map((post) => (
        <section key={post.id}>
          <h1>{post.title}</h1>
          <Viewer initialValue={post.contents} />
          <p>
            카테고리
            {post.category}
          </p>
        </section>
      ))} */}
    </div>
  );
}
