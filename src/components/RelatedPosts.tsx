// src/components/RelatedPosts.tsx
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Flicking, { FlickingEvents } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { AutoPlay } from "@egjs/flicking-plugins";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

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

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const displayedPosts = posts.slice(0, 4);
  const flickingRef = useRef<Flicking>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Nuevo estado
  const plugins = [new AutoPlay({ duration: 3000, stopOnHover: true })];

  const goNext = () => {
    if (!isAnimating) {  // Verificar si ya hay una animación en curso
      flickingRef.current?.next();
      setIsAnimating(true);  // Activar animación
    }
  };

  const goPrev = () => {
    if (!isAnimating) {  // Verificar si ya hay una animación en curso
      flickingRef.current?.prev();
      setIsAnimating(true);  // Activar animación
    }
  };

  return (
    <div className="pt-12 pb-12">
      <h2 className="text-2xl font-bold mb-6">Contenido relacionado:</h2>
      
      {/* Diseño de cuadrícula en desktop */}
      <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayedPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link href={`/posts/${post.slug}`}>
              <div className="relative w-full h-48 cursor-pointer">
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
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title.rendered}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">{new Date(post.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slider para dispositivos móviles */}
      <div className="lg:hidden relative">
        <Flicking
          ref={flickingRef}
          align="center"
          circular={true}
          onChanged={(e: FlickingEvents) => {
            setCurrentIndex(e.index);
            setIsAnimating(false); // Animación completada
          }}
          plugins={plugins}
          className="space-x-4"
          onWillChange={() => setIsAnimating(true)}
        >
          {displayedPosts.map((post) => (
            <div key={post.id} className="w-[80%] bg-white shadow-lg rounded-lg overflow-hidden">
              <Link href={`/posts/${post.slug}`}>
                <div className="relative w-full h-48 cursor-pointer">
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
                <h3 className="text-lg font-semibold mb-2">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title.rendered}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </Flicking>

        {/* Botones de navegación */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10"
        >
          <BiChevronRight size={24} />
        </button>

        {/* Indicadores de paginación (dots) */}
        <div className="flex justify-center space-x-2 mt-4">
          {displayedPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                flickingRef.current?.moveTo(index);
                setIsAnimating(true); // Iniciar animación
              }}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
