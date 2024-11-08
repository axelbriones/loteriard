// src/components/PostGrid.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  featured_media_url: string;
}

interface PostGridProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 12;

export default function PostGrid({ posts }: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el índice de inicio y fin de los posts para la página actual
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Total de páginas
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Funciones para cambiar de página
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 pt-24 pb-24 container mx-auto">
      {/* Grid de posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link href={`/posts/${post.slug}`}>
              <div className="relative w-full h-64 cursor-pointer">
                <Image
                  src={post.featured_media_url}
                  alt={post.title.rendered}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title.rendered}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{new Date(post.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          &#8592; Ant
        </button>
        <span className="font-semibold text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Sig &#8594;
        </button>
      </div>
    </div>
  );
}
