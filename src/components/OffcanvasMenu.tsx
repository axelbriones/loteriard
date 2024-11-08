// src/components/OffcanvasMenu.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiX } from 'react-icons/bi';

export default function OffcanvasMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixedinset-0 z-[2000] bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <aside
        className={`fixed z-[2000] top-0 left-0 h-[100vh] w-[550px] bg-white shadow-lg p-6 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Evita cerrar el menú al hacer clic dentro del mismo
      >
        <button onClick={onClose} className="text-gray-900 text-2xl mb-4 focus:outline-none">
          <BiX />
        </button>

        <Link href="/" className="flex items-center space-x-2 py-[40px]">
          <Image src="/logo.png" alt="Logo" width={100} height={79} />
        </Link>

        <nav className="space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-orange-500">Inicio</Link>
          <Link href="/loterias" className="block text-gray-700 hover:text-orange-500">Números ganadores</Link>
          <Link href="/about" className="block text-gray-700 hover:text-orange-500">Nosotros</Link>
          <Link href="/services" className="block text-gray-700 hover:text-orange-500">Servicios</Link>
          <Link href="/contact" className="block text-gray-700 hover:text-orange-500">Contacto</Link>
        </nav>
      </aside>
    </div>
  );
}
