// src/layouts/MainLayout.tsx
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Lotería Dominicana',
  description: 'Resultados y blog de la Lotería Dominicana',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header disponible en todas las páginas */}
      <Header />
      
      {/* Contenido principal de la página */}
      <main className='z-[0] px-4 lg:px-16'>{children}</main>

      <Footer />
    </>
  );
}
