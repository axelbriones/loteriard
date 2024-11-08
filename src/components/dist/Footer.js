"use strict";
exports.__esModule = true;
// src/components/Footer.tsx
var image_1 = require("next/image");
var link_1 = require("next/link");
var fa_1 = require("react-icons/fa");
function Footer() {
    return (React.createElement("footer", { className: "bg-gray-200 text-gray-700 py-8 px-4 mt-16" },
        React.createElement("div", { className: "container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0" },
            React.createElement("div", { className: "flex justify-center md:justify-start items-center space-x-2" },
                React.createElement(image_1["default"], { src: "/logo.png", alt: "Logo", width: 60, height: 60 })),
            React.createElement("div", { className: "flex flex-col lg:w-[40%] md:flex-row md:space-x-8 text-center md:text-left space-y-4 md:space-y-0" },
                React.createElement("div", { className: "flex flex-col space-y-2 w-full lg:w-[49%]" },
                    React.createElement(link_1["default"], { href: "/loterias", className: "text-orange-500 hover:underline" }, "N\u00FAmeros ganadores"),
                    React.createElement(link_1["default"], { href: "/contactar", className: "text-orange-500 hover:underline" }, "Contactar"),
                    React.createElement(link_1["default"], { href: "/cookies", className: "text-orange-500 hover:underline" }, "Cookies"),
                    React.createElement(link_1["default"], { href: "/politica-privacidad", className: "text-orange-500 hover:underline" }, "Pol\u00EDtica y Privacidad")),
                React.createElement("div", { className: "flex flex-col space-y-2 w-full lg:w-[49%]" },
                    React.createElement(link_1["default"], { href: "/nosotros", className: "text-orange-500 hover:underline" }, "Nosotros"),
                    React.createElement(link_1["default"], { href: "/numeros-calientes", className: "text-orange-500 hover:underline" }, "N\u00FAmeros calientes"),
                    React.createElement(link_1["default"], { href: "/numeros-frios", className: "text-orange-500 hover:underline" }, "N\u00FAmeros fr\u00EDos"),
                    React.createElement(link_1["default"], { href: "/horarios", className: "text-orange-500 hover:underline" }, "Horarios disponibles"))),
            React.createElement("div", { className: "flex justify-center space-x-4 text-2xl" },
                React.createElement("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook" },
                    React.createElement(fa_1.FaFacebook, { className: "hover:text-gray-900" })),
                React.createElement("a", { href: "https://twitter.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Twitter" },
                    React.createElement(fa_1.FaTwitter, { className: "hover:text-gray-900" })),
                React.createElement("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram" },
                    React.createElement(fa_1.FaInstagram, { className: "hover:text-gray-900" })),
                React.createElement("a", { href: "https://youtube.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "YouTube" },
                    React.createElement(fa_1.FaYoutube, { className: "hover:text-gray-900" })))),
        React.createElement("div", { className: "border-t border-gray-300 mt-8 pt-4" },
            React.createElement("p", { className: "text-center text-sm text-gray-600" },
                "Numeroganadores.com - blog \u00A9 2024, All rights reserved. | ",
                React.createElement(link_1["default"], { href: "/politicas-condiciones", className: "hover:underline" }, "Pol\u00EDticas y Condiciones")))));
}
exports["default"] = Footer;
