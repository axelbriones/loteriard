"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// src/pages/loterias/index.tsx
var react_1 = require("react");
var wordpressApi_1 = require("@/services/wordpressApi"); // Importa ambas funciones
var LoteriaCard_1 = require("@/components/LoteriaCard");
var image_1 = require("next/image");
var link_1 = require("next/link");
var MainLayout_1 = require("@/layouts/MainLayout");
function LoteriasPage() {
    var _this = this;
    var _a = react_1.useState([]), loterias = _a[0], setLoterias = _a[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var mockData, realData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wordpressApi_1.fetchLoteriasMock()];
                    case 1:
                        mockData = _a.sent();
                        return [4 /*yield*/, wordpressApi_1.fetchLoterias()];
                    case 2:
                        realData = _a.sent();
                        setLoterias(__spreadArrays(mockData, realData)); // Incluye ambas fuentes de datos en el estado
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    return (React.createElement(MainLayout_1["default"], null,
        React.createElement("div", { className: "container mx-auto py-8" },
            React.createElement("h1", { className: "text-3xl font-bold mb-8 text-center" }, "Loter\u00EDas"),
            React.createElement("div", { className: "flex justify-center items-center flex-wrap gap-6 mb-12" }, loterias.map(function (loteria) { return (!loteria.mainNumbers ? (React.createElement("div", { key: loteria.id, className: "w-24 text-center transition-transform duration-300 hover:scale-105 flex flex-col items-center" },
                React.createElement(link_1["default"], { href: "/loterias/" + loteria.slug, className: "flex flex-col items-center group" },
                    React.createElement("div", { className: "w-[64px] h-[64px] mb-2" },
                        React.createElement(image_1["default"], { src: loteria.imagen_destacada, alt: loteria.title, width: 64, height: 64, className: "filter group-hover:filter-none", style: {
                                filter: 'saturate(0.2)',
                                transition: 'filter 0.3s ease'
                            } })),
                    React.createElement("p", { className: "mt-2 font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-tight", style: {
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            lineHeight: '1rem'
                        } }, loteria.title.toUpperCase())))) : null); })),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" }, loterias.map(function (loteria) { return (loteria.mainNumbers ? (React.createElement(LoteriaCard_1["default"], { key: loteria.id, title: loteria.title, logo: loteria.imagen_destacada, mainNumbers: loteria.mainNumbers, specialNumbers: loteria.specialNumbers, additionalText: loteria.additionalText, color: loteria.color || '#324A89' })) : null); })))));
}
exports["default"] = LoteriasPage;
