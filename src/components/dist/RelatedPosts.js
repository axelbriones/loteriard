"use strict";
exports.__esModule = true;
// src/components/RelatedPosts.tsx
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var react_flicking_1 = require("@egjs/react-flicking");
require("@egjs/react-flicking/dist/flicking.css");
var flicking_plugins_1 = require("@egjs/flicking-plugins");
var bi_1 = require("react-icons/bi");
function RelatedPosts(_a) {
    var posts = _a.posts;
    var displayedPosts = posts.slice(0, 4);
    var flickingRef = react_1.useRef(null);
    var _b = react_1.useState(0), currentIndex = _b[0], setCurrentIndex = _b[1];
    var _c = react_1.useState(false), isAnimating = _c[0], setIsAnimating = _c[1]; // Nuevo estado
    var plugins = [new flicking_plugins_1.AutoPlay({ duration: 3000, stopOnHover: true })];
    var goNext = function () {
        var _a;
        if (!isAnimating) { // Verificar si ya hay una animación en curso
            (_a = flickingRef.current) === null || _a === void 0 ? void 0 : _a.next();
            setIsAnimating(true); // Activar animación
        }
    };
    var goPrev = function () {
        var _a;
        if (!isAnimating) { // Verificar si ya hay una animación en curso
            (_a = flickingRef.current) === null || _a === void 0 ? void 0 : _a.prev();
            setIsAnimating(true); // Activar animación
        }
    };
    return (react_1["default"].createElement("div", { className: "pt-12 pb-12" },
        react_1["default"].createElement("h2", { className: "text-2xl font-bold mb-6" }, "Contenido relacionado:"),
        react_1["default"].createElement("div", { className: "hidden lg:grid grid-cols-2 md:grid-cols-4 gap-6" }, displayedPosts.map(function (post) { return (react_1["default"].createElement("div", { key: post.id, className: "bg-white shadow-lg rounded-lg overflow-hidden" },
            react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug },
                react_1["default"].createElement("div", { className: "relative w-full h-48 cursor-pointer" },
                    react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, layout: "fill", objectFit: "cover", className: "rounded-t-lg" }))),
            react_1["default"].createElement("div", { className: "p-4" },
                react_1["default"].createElement("h3", { className: "text-lg font-semibold mb-2" },
                    react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug, className: "hover:underline" }, post.title.rendered)),
                react_1["default"].createElement("p", { className: "text-gray-600 text-sm" }, new Date(post.date).toLocaleDateString())))); })),
        react_1["default"].createElement("div", { className: "lg:hidden relative" },
            react_1["default"].createElement(react_flicking_1["default"], { ref: flickingRef, align: "center", circular: true, onChanged: function (e) {
                    setCurrentIndex(e.index);
                    setIsAnimating(false); // Animación completada
                }, plugins: plugins, className: "space-x-4", onWillChange: function () { return setIsAnimating(true); } }, displayedPosts.map(function (post) { return (react_1["default"].createElement("div", { key: post.id, className: "w-[80%] bg-white shadow-lg rounded-lg overflow-hidden" },
                react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug },
                    react_1["default"].createElement("div", { className: "relative w-full h-48 cursor-pointer" },
                        react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, layout: "fill", objectFit: "cover", className: "rounded-t-lg" }))),
                react_1["default"].createElement("div", { className: "p-4" },
                    react_1["default"].createElement("h3", { className: "text-lg font-semibold mb-2" },
                        react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug, className: "hover:underline" }, post.title.rendered)),
                    react_1["default"].createElement("p", { className: "text-gray-600 text-sm" }, new Date(post.date).toLocaleDateString())))); })),
            react_1["default"].createElement("button", { onClick: goPrev, className: "absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10" },
                react_1["default"].createElement(bi_1.BiChevronLeft, { size: 24 })),
            react_1["default"].createElement("button", { onClick: goNext, className: "absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10" },
                react_1["default"].createElement(bi_1.BiChevronRight, { size: 24 })),
            react_1["default"].createElement("div", { className: "flex justify-center space-x-2 mt-4" }, displayedPosts.map(function (_, index) { return (react_1["default"].createElement("button", { key: index, onClick: function () {
                    var _a;
                    (_a = flickingRef.current) === null || _a === void 0 ? void 0 : _a.moveTo(index);
                    setIsAnimating(true); // Iniciar animación
                }, className: "w-2 h-2 rounded-full " + (currentIndex === index ? 'bg-gray-800' : 'bg-gray-400') })); })))));
}
exports["default"] = RelatedPosts;
