// src/services/wordpressApi.ts
import axios from 'axios';
import loteriasData from '../../data/loterias.json';

// Configuración de Axios para la API de WordPress
const wordpressApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
});

// Helper para generar URLs absolutas para imágenes
const makeAbsoluteUrl = (url: string) => {
  if (url && url.startsWith('/wp-content')) {
    return `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}${url}`;
  }
  return url;
};

// Función para obtener datos de loterías de prueba desde el archivo JSON
export const fetchLoteriasMock = async () => {
  // Simula una solicitud asincrónica usando el archivo JSON local
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loteriasData);
    }, 500); // Agrega un retardo opcional para simular una solicitud de red
  });
};

// Obtener todas las loterías (custom post type "loterias") con campos personalizados de imagen desde WordPress
export const fetchLoterias = async () => {
  try {
    const response = await wordpressApi.get('/loterias', {
      params: { _embed: true, per_page: 100 },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((loteria: any) => ({
      id: loteria.id,
      title: loteria.title.rendered,  // Título del post de la lotería
      slug: loteria.slug,
      imagen_destacada: makeAbsoluteUrl(loteria.imagen_destacada || ''), // Campo personalizado de imagen destacada
      imagen_pais: makeAbsoluteUrl(loteria.imagen_pais || ''), // Campo personalizado de imagen del país
    }));
  } catch (error) {
    console.error('Error fetching loterias:', error);
    return [];
  }
};

// Obtener una sola lotería por `slug`
export const fetchSingleLoteria = async (slug: string) => {
  try {
    const response = await wordpressApi.get('/loterias', {
      params: { slug, _embed: true },
    });
    const loteria = response.data[0];
    return loteria
      ? {
          id: loteria.id,
          title: loteria.title.rendered,
          slug: loteria.slug,
          imagen_destacada: makeAbsoluteUrl(loteria.imagen_destacada || ''),
          imagen_pais: makeAbsoluteUrl(loteria.imagen_pais || ''),
        }
      : null;
  } catch (error) {
    console.error(`Error fetching loteria with slug ${slug}:`, error);
    return null;
  }
};

// Obtener todos los posts del blog con paginación
export const fetchAllWordpressPosts = async () => {
  const allPosts = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await wordpressApi.get('/posts', {
        params: {
          per_page: perPage,
          page,
          _embed: true,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const posts = response.data.map((post: any) => ({
        ...post,
        featured_media_url: makeAbsoluteUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''),
      }));

      allPosts.push(...posts);
      if (posts.length < perPage) break;
      page += 1;
    }
    return allPosts;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
};

// Obtener un solo post del blog por `slug`
export const fetchSinglePost = async (slug: string) => {
  try {
    const response = await wordpressApi.get('/posts', {
      params: { slug, _embed: true },
    });
    const post = response.data[0];
    return post
      ? {
          ...post,
          featured_media_url: makeAbsoluteUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''),
        }
      : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};

// Obtener posts relacionados por categoría
export const fetchRelatedPosts = async (categoryId: number) => {
  try {
    const response = await wordpressApi.get('/posts', {
      params: {
        categories: categoryId,
        per_page: 4,
        _embed: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((post: any) => ({
      ...post,
      featured_media_url: makeAbsoluteUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''),
    }));
  } catch (error) {
    console.error(`Error fetching related posts for category ${categoryId}:`, error);
    return [];
  }
};
