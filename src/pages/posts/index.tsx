// src/pages/posts/index.tsx
import { useEffect, useState } from 'react';
import { fetchAllWordpressPosts } from '@/services/wordpressApi'; // Asegúrate de usar la función correcta para obtener los posts
import MainLayout from '@/layouts/MainLayout';
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
  slug: string;
}

export default function PostsArchive() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getData = async () => {
      const wordpressPosts = await fetchAllWordpressPosts();
      setPosts(
        wordpressPosts.map((post) => ({
          ...post,
          featured_media_url: post.featured_media_url || '/placeholder.png',
        }))
      );
    };
    getData();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-[2rem] lg:text-[3rem] font-bold text-center pt-8">Contenido del blog</h1>
        <PostGrid posts={posts} />
      </div>
    </MainLayout>
  );
}
