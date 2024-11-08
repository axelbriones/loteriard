// src/pages/loterias/index.tsx
import { useEffect, useState } from 'react';
import { fetchLoterias, fetchLoteriasMock } from '@/services/wordpressApi'; // Importa ambas funciones
import LoteriaCard from '@/components/LoteriaCard';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';

interface Loteria {
  id: number;
  title: string;
  slug: string;
  imagen_destacada: string;
  mainNumbers?: string[];
  specialNumbers?: string[];
  additionalText?: string;
  color?: string;
}

export default function LoteriasPage() {
  const [loterias, setLoterias] = useState<Loteria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Usa fetchLoteriasMock() para los datos de ejemplo y fetchLoterias() para los datos reales desde la API de WordPress
      const mockData = await fetchLoteriasMock();
      const realData = await fetchLoterias();
      setLoterias([...mockData, ...realData]); // Incluye ambas fuentes de datos en el estado
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Loterías</h1>

        {/* Sección 2: Datos reales en lista de íconos */}
        <div className="flex justify-center items-center flex-wrap gap-6 mb-12">
          {loterias.map((loteria) => (
            !loteria.mainNumbers ? (
              <div
                key={loteria.id}
                className="w-24 text-center transition-transform duration-300 hover:scale-105 flex flex-col items-center"
              >
                <Link href={`/loterias/${loteria.slug}`} className="flex flex-col items-center group">
                  {/* Imagen de la lotería */}
                  <div className="w-[64px] h-[64px] mb-2">
                    <Image
                      src={loteria.imagen_destacada}
                      alt={loteria.title}
                      width={64}
                      height={64}
                      className="filter group-hover:filter-none"
                      style={{
                        filter: 'saturate(0.2)',
                        transition: 'filter 0.3s ease',
                      }}
                    />
                  </div>
                  {/* Título de la lotería con altura fija */}
                  <p
                    className="mt-2 font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-tight"
                    style={{
                      height: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      lineHeight: '1rem',
                    }}
                  >
                    {loteria.title.toUpperCase()}
                  </p>
                </Link>
              </div>
            ) : null
          ))}
        </div>

        {/* Sección 1: Datos de ejemplo en tarjetas detalladas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loterias.map((loteria) => (
            loteria.mainNumbers ? (
              <LoteriaCard
                key={loteria.id}
                title={loteria.title}
                logo={loteria.imagen_destacada}
                mainNumbers={loteria.mainNumbers}
                specialNumbers={loteria.specialNumbers}
                additionalText={loteria.additionalText}
                color={loteria.color || '#324A89'} // Fallback color
              />
            ) : null
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
