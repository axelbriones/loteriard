"use strict";
exports.__esModule = true;
// src/components/PostSlider.tsx
var react_1 = require("react");
var react_flicking_1 = require("@egjs/react-flicking");
require("@egjs/react-flicking/dist/flicking.css");
var flicking_plugins_1 = require("@egjs/flicking-plugins");
var image_1 = require("next/image");
function PostSlider(_a) {
    var posts = _a.posts;
    var plugins = [new flicking_plugins_1.Fade(), new flicking_plugins_1.AutoPlay({ duration: 2000, stopOnHover: true })];
    return (react_1["default"].createElement("div", { className: "flex space-x-4" },
        react_1["default"].createElement(react_flicking_1["default"], { plugins: plugins, circular: true, className: "w-3/4 max-h-[500px] rounded-lg overflow-hidden", align: "center" }, posts.map(function (post) { return (react_1["default"].createElement("div", { key: post.id, className: "flicking-panel relative max-h-[500px]" },
            react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, layout: "fill", objectFit: "cover", className: "rounded-lg" }),
            react_1["default"].createElement("div", { className: "bottom-4 left-4 text-white" },
                react_1["default"].createElement("h2", { className: "text-2xl font-bold" }, post.title.rendered),
                react_1["default"].createElement("p", null, new Date(post.date).toLocaleDateString())))); })),
        react_1["default"].createElement("div", { className: "w-1/4 overflow-y-auto max-h-[500px]" }, posts.map(function (post) { return (react_1["default"].createElement("div", { key: post.id, className: "flex items-center space-x-2 p-2 bg-gray-100 rounded-lg mb-2" },
            react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, width: 50, height: 50, className: "object-cover rounded-md" }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h3", { className: "text-sm font-semibold" }, post.title.rendered)))); }))));
}
exports["default"] = PostSlider;
