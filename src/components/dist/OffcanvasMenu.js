"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var image_1 = require("next/image");
var bi_1 = require("react-icons/bi");
function OffcanvasMenu(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    return (React.createElement("div", { className: "fixedinset-0 z-[2000] bg-black bg-opacity-50 transition-opacity " + (isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'), onClick: onClose },
        React.createElement("aside", { className: "fixed z-[2000] top-0 left-0 h-[100vh] w-[550px] bg-white shadow-lg p-6 transform transition-transform " + (isOpen ? 'translate-x-0' : '-translate-x-full'), onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("button", { onClick: onClose, className: "text-gray-900 text-2xl mb-4 focus:outline-none" },
                React.createElement(bi_1.BiX, null)),
            React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2 py-[40px]" },
                React.createElement(image_1["default"], { src: "/logo.png", alt: "Logo", width: 100, height: 79 })),
            React.createElement("nav", { className: "space-y-4" },
                React.createElement(link_1["default"], { href: "/", className: "block text-gray-700 hover:text-orange-500" }, "Inicio"),
                React.createElement(link_1["default"], { href: "/loterias", className: "block text-gray-700 hover:text-orange-500" }, "N\u00FAmeros ganadores"),
                React.createElement(link_1["default"], { href: "/about", className: "block text-gray-700 hover:text-orange-500" }, "Nosotros"),
                React.createElement(link_1["default"], { href: "/services", className: "block text-gray-700 hover:text-orange-500" }, "Servicios"),
                React.createElement(link_1["default"], { href: "/contact", className: "block text-gray-700 hover:text-orange-500" }, "Contacto")))));
}
exports["default"] = OffcanvasMenu;
