"use strict";
exports.__esModule = true;
// src/components/PostSlider.tsx
var react_1 = require("react");
var react_flicking_1 = require("@egjs/react-flicking");
require("@egjs/react-flicking/dist/flicking.css");
var flicking_plugins_1 = require("@egjs/flicking-plugins");
var image_1 = require("next/image");
var link_1 = require("next/link");
function PostSlider(_a) {
    var posts = _a.posts;
    var plugins = [new flicking_plugins_1.Fade(), new flicking_plugins_1.AutoPlay({ duration: 2000, stopOnHover: true })];
    var flickingRef = react_1.useRef(null);
    var _b = react_1.useState(0), currentIndex = _b[0], setCurrentIndex = _b[1];
    var _c = react_1.useState(false), isAnimating = _c[0], setIsAnimating = _c[1];
    var displayedPosts = posts.slice(0, 5);
    var handleThumbnailClick = function (index) {
        var _a;
        if (!isAnimating) {
            (_a = flickingRef.current) === null || _a === void 0 ? void 0 : _a.moveTo(index);
            setCurrentIndex(index);
            setIsAnimating(true);
        }
    };
    var goNext = function () {
        var _a, _b;
        if (!isAnimating) {
            if (currentIndex < displayedPosts.length - 1) {
                (_a = flickingRef.current) === null || _a === void 0 ? void 0 : _a.next();
            }
            else {
                (_b = flickingRef.current) === null || _b === void 0 ? void 0 : _b.moveTo(0);
            }
            setIsAnimating(true);
        }
    };
    var goPrev = function () {
        var _a, _b;
        if (!isAnimating) {
            if (currentIndex > 0) {
                (_a = flickingRef.current) === null || _a === void 0 ? void 0 : _a.prev();
            }
            else {
                (_b = flickingRef.current) === null || _b === void 0 ? void 0 : _b.moveTo(displayedPosts.length - 1);
            }
            setIsAnimating(true);
        }
    };
    return (react_1["default"].createElement("div", { className: "flex flex-col lg:flex-row z-[0] lg:space-x-4 space-y-4 lg:space-y-0 w-full m-auto container mx-auto" },
        react_1["default"].createElement("div", { className: "relative w-full lg:w-3/4 max-h-[500px]" },
            react_1["default"].createElement("button", { onClick: goPrev, className: "absolute top-1/2 left-2 transform -translate-y-1/2 z-[10] bg-gray-800 bg-opacity-50 text-white p-2 rounded-full" }, "\u276E"),
            react_1["default"].createElement("button", { onClick: goNext, className: "absolute top-1/2 right-2 transform -translate-y-1/2 z-[10] bg-gray-800 bg-opacity-50 text-white p-2 rounded-full" }, "\u276F"),
            react_1["default"].createElement(react_flicking_1["default"], { ref: flickingRef, plugins: plugins, circular: true, className: "rounded-lg overflow-hidden h-full", align: "center", onWillChange: function () { return setIsAnimating(true); }, onChanged: function (e) {
                    setCurrentIndex(e.index);
                    setIsAnimating(false);
                } }, displayedPosts.map(function (post) { return (react_1["default"].createElement("div", { key: post.slug, className: "flicking-panel z-[0] relative w-full h-[500px]" },
                react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, layout: "fill", objectFit: "cover", className: "rounded-lg z-[0]" }),
                react_1["default"].createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg" }),
                react_1["default"].createElement("div", { className: "absolute bottom-4 left-4 text-white z-[10]" },
                    react_1["default"].createElement("h2", { className: "text-2xl font-bold" },
                        react_1["default"].createElement(link_1["default"], { href: "/posts/" + post.slug, className: "hover:underline" }, post.title.rendered)),
                    react_1["default"].createElement("p", null, new Date(post.date).toLocaleDateString())))); })),
            react_1["default"].createElement("div", { className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2" }, displayedPosts.map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "w-2 h-2 rounded-full " + (index === currentIndex ? 'bg-white' : 'bg-gray-500') + " cursor-pointer", onClick: function () { return handleThumbnailClick(index); } })); }))),
        react_1["default"].createElement("div", { className: "w-full lg:w-1/4 max-h-[500px] lg:overflow-y-auto lg:flex-col lg:space-y-2 flex lg:justify-between lg:space-x-0 space-x-2 overflow-x-auto" }, displayedPosts.map(function (post, index) { return (react_1["default"].createElement("div", { key: post.slug, onClick: function () { return handleThumbnailClick(index); }, className: "flex items-center gap-[5px] lg:items-center cursor-pointer rounded-lg p-1 " + (index === currentIndex ? 'bg-yellow-300' : 'bg-gray-100') },
            react_1["default"].createElement(image_1["default"], { src: post.featured_media_url, alt: post.title.rendered, width: 60, height: 55, className: "w-[60px] h-[55px] object-cover rounded-md" }),
            react_1["default"].createElement("div", { className: "hidden lg:block lg:mt-2 text-[0.8em] font-semibold text-left line-clamp-3" }, post.title.rendered))); }))));
}
exports["default"] = PostSlider;
