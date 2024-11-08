// src/components/Header.tsx
import { useState, useEffect, ChangeEvent } from 'react';
import { BiMenu, BiUser, BiSearch } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import OffcanvasMenu from './OffcanvasMenu';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true); // Estado para la visibilidad del header
  const [isScrolled, setIsScrolled] = useState(false); // Estado para el estilo `fixed` al hacer scroll
  const [lastScrollY, setLastScrollY] = useState(0); // Estado para la última posición de scroll
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Si el usuario hace "downscroll" y ha bajado más de 50px, oculta el header
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsVisible(false);
      setIsScrolled(true);
    } else {
      // Si el usuario hace "upscroll", muestra el header
      setIsVisible(true);
      setIsScrolled(currentScrollY > 0); // Mantiene `fixed` si hay algún desplazamiento en Y
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <header
      className={`relative z-[2000] bg-white text-gray-900 p-4 flex items-center justify-between transition-transform duration-300 ${
        isScrolled ? 'fixed w-full top-0 z-[10]' : ''
      } ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}
    >
      <div className="flex items-center space-x-4">
        {/* Offcanvas Menu */}
        <OffcanvasMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        {/* Menú Hamburguesa */}
        <button onClick={() => setIsMenuOpen(true)} className="text-gray-900 text-2xl focus:outline-none">
          <BiMenu />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo-black.png" alt="Logo" width={350} height={79} />
        </Link>
      </div>

      {/* Íconos de Usuario y Búsqueda */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-900 text-xl focus:outline-none">
          <BiUser />
        </button>
        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-900 text-xl focus:outline-none">
          <BiSearch />
        </button>
      </div>

      {/* Barra de Búsqueda */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
        </div>
      )}
    </header>
  );
}
