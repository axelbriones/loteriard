"use strict";
exports.__esModule = true;
// src/components/LoteriaCard.tsx
var image_1 = require("next/image");
function LoteriaCard(_a) {
    var title = _a.title, logo = _a.logo, mainNumbers = _a.mainNumbers, specialNumbers = _a.specialNumbers, additionalText = _a.additionalText, color = _a.color;
    return (React.createElement("div", { className: "p-4 rounded-lg shadow-lg", style: { backgroundColor: color + "10", borderColor: color } },
        React.createElement("div", { className: "flex items-center space-x-4 mb-4" },
            React.createElement(image_1["default"], { src: logo, alt: title + " logo", width: 40, height: 40 }),
            React.createElement("h2", { className: "font-bold", style: { color: color } }, title)),
        React.createElement("div", { className: "flex space-x-2 mb-4" }, mainNumbers.map(function (num, idx) { return (React.createElement("span", { key: idx, className: "w-8 h-8 flex items-center justify-center rounded-full border", style: { color: color, borderColor: color } }, num)); })),
        React.createElement("div", { className: "flex space-x-2 mb-4" }, specialNumbers === null || specialNumbers === void 0 ? void 0 : specialNumbers.map(function (num, idx) { return (React.createElement("span", { key: idx, className: "w-8 h-8 flex items-center justify-center rounded-full bg-gray-200", style: { color: color } }, num)); })),
        additionalText && (React.createElement("p", { className: "text-sm font-semibold text-gray-700 mt-2" }, additionalText))));
}
exports["default"] = LoteriaCard;
