// src/pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import { fetchAllWordpressPosts, fetchSinglePost, fetchRelatedPosts } from '@/services/wordpressApi';
import RelatedPosts from '@/components/RelatedPosts';
import Image from 'next/image';

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media_url: string;
  slug: string;
  categories: number[];
}

interface PostPageProps {
  post: Post;
  relatedPosts: Post[];
}

export default function PostPage({ post, relatedPosts }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-4 lg:py-24">
        <h1 className="text-[2rem] lg:text-[3rem] leading-[1.2] text-center font-bold mb-4">{post.title.rendered}</h1>
        
        {post.featured_media_url && (
          <div className="relative w-full h-[450px] mb-8">
            <Image
              src={post.featured_media_url}
              alt={post.title.rendered}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        
        <p className="text-gray-400 text-center text-[14px] leading-[1.4] mb-6">
          {new Date(post.date).toLocaleDateString()}
        </p>
        
        <div
          className="prose max-w-none text-[16px] leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Sección de posts relacionados */}
        <RelatedPosts posts={relatedPosts} />
      </div>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchAllWordpressPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true, // Activa el modo de fallback para posts nuevos
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const post = await fetchSinglePost(slug);

  if (!post) {
    return { notFound: true };
  }

  // Obtener posts relacionados de la misma categoría
  const relatedPosts = post.categories.length > 0
    ? await fetchRelatedPosts(post.categories[0]) // Usa la primera categoría
    : [];

  return {
    props: {
      post,
      relatedPosts,
    },
    revalidate: 10, // Revalida la página cada 10 segundos para obtener actualizaciones
  };
};
