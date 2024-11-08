"use strict";
exports.__esModule = true;
// src/components/PostGrid.tsx
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var POSTS_PER_PAGE = 12;
function PostGrid(_a) {
    var posts = _a.posts;
    var _b = react_1.useState(1), currentPage = _b[0], setCurrentPage = _b[1];
    // Calcula el índice de inicio y fin de los posts para la página actual
    var startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    var endIndex = startIndex + POSTS_PER_PAGE;
    var currentPosts = posts.slice(startIndex, endIndex);
    // Total de páginas
    var totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    // Funciones para cambiar de página
    var goToNextPage = function () {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    var goToPrevPage = function () {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (react_1["default"].createElement("div", { className: "flex flex-col items-center space-y-8 pt-24 pb-24 container mx-auto" },
        react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full" }, currentPosts.map(function (post) { return (react_1["default"].createElement("div", { key: post.id, className: "bg-white shadow-lg rounded-lg overflow-hidden" },
            react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug },
                react_1["default"].createElement("div", { className: "relative w-full h-64 cursor-pointer" },
                    react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, layout: "fill", objectFit: "cover", className: "rounded-t-lg" }))),
            react_1["default"].createElement("div", { className: "p-4" },
                react_1["default"].createElement("h3", { className: "text-xl font-bold mb-2" },
                    react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug, className: "hover:underline" }, post.title.rendered)),
                react_1["default"].createElement("p", { className: "text-gray-600 mb-4" }, new Date(post.date).toLocaleDateString())))); })),
        react_1["default"].createElement("div", { className: "flex items-center space-x-4" },
            react_1["default"].createElement("button", { onClick: goToPrevPage, disabled: currentPage === 1, className: "px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50" }, "\u2190 Ant"),
            react_1["default"].createElement("span", { className: "font-semibold text-lg" },
                currentPage,
                " / ",
                totalPages),
            react_1["default"].createElement("button", { onClick: goToNextPage, disabled: currentPage === totalPages, className: "px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50" }, "Sig \u2192"))));
}
exports["default"] = PostGrid;
