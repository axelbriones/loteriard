// src/pages/index.tsx
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { fetchAllWordpressPosts } from '@/services/wordpressApi'; // Cambiado a `fetchAllWordpressPosts`
import PostSlider from '@/components/PostSlider';
import PostGrid from '@/components/PostGrid';

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  featured_media_url: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getData = async () => {
      const wordpressPosts = await fetchAllWordpressPosts(); // Cambiado a `fetchAllWordpressPosts`
      setPosts(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wordpressPosts.map((post: any) => ({
          ...post,
          featured_media_url: post.featured_media_url || '/placeholder.png', // Usa un placeholder si no hay imagen
        }))
      );
    };
    getData();
  }, []);

  return (
    <MainLayout>
      <PostSlider posts={posts} />
      <PostGrid posts={posts} />
    </MainLayout>
  );
}
