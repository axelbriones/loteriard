// src/pages/loterias/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { fetchLoterias, fetchSingleLoteria } from '@/services/wordpressApi';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';

interface Loteria {
  id: number;
  title: string;
  slug: string;
  imagen_destacada: string;
}

interface SingleLoteriaPageProps {
  loteria: Loteria;
}

export default function SingleLoteriaPage({ loteria }: SingleLoteriaPageProps) {
  const [loterias, setLoterias] = useState<Loteria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const loteriasData = await fetchLoterias();
      setLoterias(loteriasData);
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        {/* Sección de otros bloques de Loterías */}
        <div className="flex justify-center items-center flex-wrap gap-6 mb-12">
          {loterias.map((otherLoteria) => (
            <div
              key={otherLoteria.id}
              className="w-24 text-center transition-transform duration-300 hover:scale-105 flex flex-col items-center"
            >
              <Link href={`/loterias/${otherLoteria.slug}`} className="flex flex-col items-center group">
                {/* Imagen de la lotería, sin saturación si es el post actual */}
                <div className="w-[64px] h-[64px] mb-2">
                  <Image
                    src={otherLoteria.imagen_destacada}
                    alt={otherLoteria.title}
                    width={64}
                    height={64}
                    className={`filter ${
                      otherLoteria.id === loteria.id ? 'filter-none' : 'saturate-20 group-hover:filter-none'
                    }`}
                    style={{
                      filter: otherLoteria.id === loteria.id ? 'none' : 'saturate(0.2)',
                      transition: 'filter 0.3s ease',
                    }}
                  />
                </div>
                {/* Título de la lotería */}
                <p
                  className="mt-2 font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-tight"
                  style={{ height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '0.875rem', lineHeight: '1rem' }}
                >
                  {otherLoteria.title.toUpperCase()}
                </p>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Título del post actual */}
        <h1 className="text-4xl font-bold mb-8 text-center">{loteria.title}</h1>

        {/* Contenido del post actual */}
        <div className="mb-12 text-center">
          <Image
            src={loteria.imagen_destacada}
            alt={loteria.title}
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          {/* Aquí puedes añadir más contenido del post si existe */}
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const loterias = await fetchLoterias();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = loterias.map((loteria: { slug: any; }) => ({
    params: { slug: loteria.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const loteria = await fetchSingleLoteria(slug);

  if (!loteria) {
    return { notFound: true };
  }

  return {
    props: { loteria },
    revalidate: 10,
  };
};
