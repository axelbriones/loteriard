// src/components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 py-8 px-4 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Logo */}
        <div className="flex justify-center md:justify-start items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </div>

        {/* Links de navegación */}
        <div className="flex flex-col lg:w-[40%] md:flex-row md:space-x-8 text-center md:text-left space-y-4 md:space-y-0">
          {/* Primera columna de enlaces */}
          <div className="flex flex-col space-y-2 w-full lg:w-[49%]">
            <Link href="/loterias" className="text-orange-500 hover:underline">Números ganadores</Link>
            <Link href="/contactar" className="text-orange-500 hover:underline">Contactar</Link>
            <Link href="/cookies" className="text-orange-500 hover:underline">Cookies</Link>
            <Link href="/politica-privacidad" className="text-orange-500 hover:underline">Política y Privacidad</Link>
          </div>
          {/* Segunda columna de enlaces */}
          <div className="flex flex-col space-y-2 w-full lg:w-[49%]">
            <Link href="/nosotros" className="text-orange-500 hover:underline">Nosotros</Link>
            <Link href="/numeros-calientes" className="text-orange-500 hover:underline">Números calientes</Link>
            <Link href="/numeros-frios" className="text-orange-500 hover:underline">Números fríos</Link>
            <Link href="/horarios" className="text-orange-500 hover:underline">Horarios disponibles</Link>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-4 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="hover:text-gray-900" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="hover:text-gray-900" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="hover:text-gray-900" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube className="hover:text-gray-900" />
          </a>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-300 mt-8 pt-4">
        <p className="text-center text-sm text-gray-600">
          Numeroganadores.com - blog © 2024, All rights reserved. | <Link href="/politicas-condiciones" className="hover:underline">Políticas y Condiciones</Link>
        </p>
      </div>
    </footer>
  );
}
