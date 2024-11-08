// src/components/PostSlider.tsx
import React, { useRef, useState } from 'react';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Fade, AutoPlay } from "@egjs/flicking-plugins";
import Image from "next/image";
import Link from 'next/link';

interface Post {
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

interface PostSliderProps {
  posts: Post[];
}

export default function PostSlider({ posts }: PostSliderProps) {
  const plugins = [new Fade(), new AutoPlay({ duration: 2000, stopOnHover: true })];
  const flickingRef = useRef<Flicking>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const displayedPosts = posts.slice(0, 5);

  const handleThumbnailClick = (index: number) => {
    if (!isAnimating) {
      flickingRef.current?.moveTo(index);
      setCurrentIndex(index);
      setIsAnimating(true);
    }
  };

  const goNext = () => {
    if (!isAnimating) {
      if (currentIndex < displayedPosts.length - 1) {
        flickingRef.current?.next();
      } else {
        flickingRef.current?.moveTo(0);
      }
      setIsAnimating(true);
    }
  };

  const goPrev = () => {
    if (!isAnimating) {
      if (currentIndex > 0) {
        flickingRef.current?.prev();
      } else {
        flickingRef.current?.moveTo(displayedPosts.length - 1);
      }
      setIsAnimating(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row z-[0] lg:space-x-4 space-y-4 lg:space-y-0 w-full m-auto container mx-auto">
      {/* Slider principal con Flechas de navegación */}
      <div className="relative w-full lg:w-3/4 max-h-[500px]">
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-[10] bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-[10] bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        >
          &#10095;
        </button>

        <Flicking
          ref={flickingRef}
          plugins={plugins}
          circular={true}
          className="rounded-lg overflow-hidden h-full"
          align="center"
          onWillChange={() => setIsAnimating(true)}
          onChanged={(e) => {
            setCurrentIndex(e.index);
            setIsAnimating(false);
          }}
        >
          {displayedPosts.map((post) => (
            <div key={post.slug} className="flicking-panel z-[0] relative w-full h-[500px]">
              <Image
                src={post.featured_media_url}
                alt={post.title.rendered}
                layout="fill"
                objectFit="cover"
                className="rounded-lg z-[0]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white z-[10]">
              <h2 className="text-2xl font-bold">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title.rendered}
                </Link>
              </h2>
                <p>{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </Flicking>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {displayedPosts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-gray-500'
              } cursor-pointer`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Miniaturas de posts - Ajuste responsivo */}
      <div className="w-full lg:w-1/4 max-h-[500px] lg:overflow-y-auto lg:flex-col lg:space-y-2 flex lg:justify-between lg:space-x-0 space-x-2 overflow-x-auto">
        {displayedPosts.map((post, index) => (
          <div
            key={post.slug}
            onClick={() => handleThumbnailClick(index)}
            className={`flex items-center gap-[5px] lg:items-center cursor-pointer rounded-lg p-1 ${
              index === currentIndex ? 'bg-yellow-300' : 'bg-gray-100'
            }`}
          >
            <Image
                src={post.featured_media_url}
                alt={post.title.rendered}
                width={60}
                height={55}
                className="w-[60px] h-[55px] object-cover rounded-md"
            />
            {/* Ocultar título en dispositivos móviles */}
            <div className="hidden lg:block lg:mt-2 text-[0.8em] font-semibold text-left line-clamp-3">
              {post.title.rendered}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
