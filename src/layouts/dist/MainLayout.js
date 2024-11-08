"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var Header_1 = require("@/components/Header");
var Footer_1 = require("@/components/Footer");
exports.metadata = {
    title: 'Lotería Dominicana',
    description: 'Resultados y blog de la Lotería Dominicana'
};
function MainLayout(_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null,
        React.createElement(Header_1["default"], null),
        React.createElement("main", { className: 'z-[0] px-4 lg:px-16' }, children),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = MainLayout;
