"use strict";
exports.__esModule = true;
// src/components/Header.tsx
var react_1 = require("react");
var bi_1 = require("react-icons/bi");
var image_1 = require("next/image");
var link_1 = require("next/link");
var OffcanvasMenu_1 = require("./OffcanvasMenu");
function Header() {
    var _a = react_1.useState(true), isVisible = _a[0], setIsVisible = _a[1]; // Estado para la visibilidad del header
    var _b = react_1.useState(false), isScrolled = _b[0], setIsScrolled = _b[1]; // Estado para el estilo `fixed` al hacer scroll
    var _c = react_1.useState(0), lastScrollY = _c[0], setLastScrollY = _c[1]; // Estado para la última posición de scroll
    var _d = react_1.useState(false), isMenuOpen = _d[0], setIsMenuOpen = _d[1];
    var _e = react_1.useState(false), isSearchOpen = _e[0], setIsSearchOpen = _e[1];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _f = react_1.useState(''), searchTerm = _f[0], setSearchTerm = _f[1];
    var handleScroll = function () {
        var currentScrollY = window.scrollY;
        // Si el usuario hace "downscroll" y ha bajado más de 50px, oculta el header
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsVisible(false);
            setIsScrolled(true);
        }
        else {
            // Si el usuario hace "upscroll", muestra el header
            setIsVisible(true);
            setIsScrolled(currentScrollY > 0); // Mantiene `fixed` si hay algún desplazamiento en Y
        }
        setLastScrollY(currentScrollY);
    };
    react_1.useEffect(function () {
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleSearch(event) {
        throw new Error('Function not implemented.');
    }
    return (React.createElement("header", { className: "relative z-[2000] bg-white text-gray-900 p-4 flex items-center justify-between transition-transform duration-300 " + (isScrolled ? 'fixed w-full top-0 z-[10]' : '') + " " + (isVisible ? 'transform translate-y-0' : 'transform -translate-y-full') },
        React.createElement("div", { className: "flex items-center space-x-4" },
            React.createElement(OffcanvasMenu_1["default"], { isOpen: isMenuOpen, onClose: function () { return setIsMenuOpen(false); } }),
            React.createElement("button", { onClick: function () { return setIsMenuOpen(true); }, className: "text-gray-900 text-2xl focus:outline-none" },
                React.createElement(bi_1.BiMenu, null)),
            React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2" },
                React.createElement(image_1["default"], { src: "/logo-black.png", alt: "Logo", width: 350, height: 79 }))),
        React.createElement("div", { className: "flex items-center space-x-4" },
            React.createElement("button", { className: "text-gray-900 text-xl focus:outline-none" },
                React.createElement(bi_1.BiUser, null)),
            React.createElement("button", { onClick: function () { return setIsSearchOpen(!isSearchOpen); }, className: "text-gray-900 text-xl focus:outline-none" },
                React.createElement(bi_1.BiSearch, null))),
        isSearchOpen && (React.createElement("div", { className: "absolute top-full left-0 w-full bg-white shadow-lg p-4" },
            React.createElement("input", { type: "text", value: searchTerm, onChange: handleSearch, placeholder: "Buscar...", className: "w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500" })))));
}
exports["default"] = Header;
