"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.fetchRelatedPosts = exports.fetchSinglePost = exports.fetchAllWordpressPosts = exports.fetchSingleLoteria = exports.fetchLoterias = exports.fetchLoteriasMock = void 0;
// src/services/wordpressApi.ts
var axios_1 = require("axios");
var loterias_json_1 = require("../../data/loterias.json");
// Configuración de Axios para la API de WordPress
var wordpressApi = axios_1["default"].create({
    baseURL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
});
// Helper para generar URLs absolutas para imágenes
var makeAbsoluteUrl = function (url) {
    if (url && url.startsWith('/wp-content')) {
        return "" + process.env.NEXT_PUBLIC_WORDPRESS_API_URL + url;
    }
    return url;
};
// Función para obtener datos de loterías de prueba desde el archivo JSON
exports.fetchLoteriasMock = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Simula una solicitud asincrónica usando el archivo JSON local
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(loterias_json_1["default"]);
                }, 500); // Agrega un retardo opcional para simular una solicitud de red
            })];
    });
}); };
// Obtener todas las loterías (custom post type "loterias") con campos personalizados de imagen desde WordPress
exports.fetchLoterias = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, wordpressApi.get('/loterias', {
                        params: { _embed: true, per_page: 100 }
                    })];
            case 1:
                response = _a.sent();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return [2 /*return*/, response.data.map(function (loteria) { return ({
                        id: loteria.id,
                        title: loteria.title.rendered,
                        slug: loteria.slug,
                        imagen_destacada: makeAbsoluteUrl(loteria.imagen_destacada || ''),
                        imagen_pais: makeAbsoluteUrl(loteria.imagen_pais || '')
                    }); })];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching loterias:', error_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Obtener una sola lotería por `slug`
exports.fetchSingleLoteria = function (slug) { return __awaiter(void 0, void 0, void 0, function () {
    var response, loteria, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, wordpressApi.get('/loterias', {
                        params: { slug: slug, _embed: true }
                    })];
            case 1:
                response = _a.sent();
                loteria = response.data[0];
                return [2 /*return*/, loteria
                        ? {
                            id: loteria.id,
                            title: loteria.title.rendered,
                            slug: loteria.slug,
                            imagen_destacada: makeAbsoluteUrl(loteria.imagen_destacada || ''),
                            imagen_pais: makeAbsoluteUrl(loteria.imagen_pais || '')
                        }
                        : null];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching loteria with slug " + slug + ":", error_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Obtener todos los posts del blog con paginación
exports.fetchAllWordpressPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allPosts, page, perPage, response, posts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                allPosts = [];
                page = 1;
                perPage = 100;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                _a.label = 2;
            case 2:
                if (!true) return [3 /*break*/, 4];
                return [4 /*yield*/, wordpressApi.get('/posts', {
                        params: {
                            per_page: perPage,
                            page: page,
                            _embed: true
                        }
                    })];
            case 3:
                response = _a.sent();
                posts = response.data.map(function (post) {
                    var _a, _b, _c;
                    return (__assign(__assign({}, post), { featured_media_url: makeAbsoluteUrl(((_c = (_b = (_a = post._embedded) === null || _a === void 0 ? void 0 : _a['wp:featuredmedia']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.source_url) || '') }));
                });
                allPosts.push.apply(allPosts, posts);
                if (posts.length < perPage)
                    return [3 /*break*/, 4];
                page += 1;
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/, allPosts];
            case 5:
                error_3 = _a.sent();
                console.error('Error fetching WordPress posts:', error_3);
                return [2 /*return*/, []];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Obtener un solo post del blog por `slug`
exports.fetchSinglePost = function (slug) { return __awaiter(void 0, void 0, void 0, function () {
    var response, post, error_4;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, wordpressApi.get('/posts', {
                        params: { slug: slug, _embed: true }
                    })];
            case 1:
                response = _d.sent();
                post = response.data[0];
                return [2 /*return*/, post
                        ? __assign(__assign({}, post), { featured_media_url: makeAbsoluteUrl(((_c = (_b = (_a = post._embedded) === null || _a === void 0 ? void 0 : _a['wp:featuredmedia']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.source_url) || '') }) : null];
            case 2:
                error_4 = _d.sent();
                console.error("Error fetching post with slug " + slug + ":", error_4);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Obtener posts relacionados por categoría
exports.fetchRelatedPosts = function (categoryId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, wordpressApi.get('/posts', {
                        params: {
                            categories: categoryId,
                            per_page: 4,
                            _embed: true
                        }
                    })];
            case 1:
                response = _a.sent();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return [2 /*return*/, response.data.map(function (post) {
                        var _a, _b, _c;
                        return (__assign(__assign({}, post), { featured_media_url: makeAbsoluteUrl(((_c = (_b = (_a = post._embedded) === null || _a === void 0 ? void 0 : _a['wp:featuredmedia']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.source_url) || '') }));
                    })];
            case 2:
                error_5 = _a.sent();
                console.error("Error fetching related posts for category " + categoryId + ":", error_5);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
