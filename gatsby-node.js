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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPostBootstrap = void 0;
var graphql_codegen_config_1 = require("./graphql-codegen.config");
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var load_1 = require("@graphql-tools/load");
var url_loader_1 = require("@graphql-tools/url-loader");
var json_file_loader_1 = require("@graphql-tools/json-file-loader");
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var DEFAULT_SCHEMA_KEY = 'default-gatsby-schema';
var defaultOptions = {
    plugins: [],
    documentPaths: ['./src/**/*.{ts,tsx}', './node_modules/gatsby-*/**/*.js'],
    fileName: 'graphql-types.ts',
    codegen: true,
    codegenDelay: 200,
    failOnError: process.env.NODE_ENV === 'production',
    pluckConfig: {
        globalGqlIdentifierName: 'graphql',
        modules: [
            {
                name: 'gatsby',
                identifier: 'graphql',
            },
        ],
    },
    additionalSchemas: [],
    codegenPlugins: [],
    codegenConfig: {},
};
var getOptions = function (pluginOptions) { return (__assign(__assign({}, defaultOptions), pluginOptions)); };
var asyncMap = function (collection, callback) {
    return Promise.all(collection.map(callback));
};
var onPostBootstrap = function (_a, pluginOptions) {
    var store = _a.store, reporter = _a.reporter;
    if (pluginOptions === void 0) { pluginOptions = { plugins: [] }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var options, documentPaths, fileName, codegenDelay, pluckConfig, additionalSchemas, failOnError, codegenPlugins, codegenConfig, _b, schema, program, directory, defaultConfig, configs, _c, _d, build, buildDebounce, watchStore;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    options = getOptions(pluginOptions);
                    if (!options.codegen)
                        return [2 /*return*/];
                    documentPaths = options.documentPaths, fileName = options.fileName, codegenDelay = options.codegenDelay, pluckConfig = options.pluckConfig, additionalSchemas = options.additionalSchemas, failOnError = options.failOnError, codegenPlugins = options.codegenPlugins, codegenConfig = options.codegenConfig;
                    _b = store.getState(), schema = _b.schema, program = _b.program;
                    directory = program.directory;
                    defaultConfig = {
                        key: DEFAULT_SCHEMA_KEY,
                        fileName: fileName,
                        documentPaths: documentPaths,
                        pluckConfig: pluckConfig,
                        directory: directory,
                        schema: schema,
                        reporter: reporter,
                        codegenPlugins: codegenPlugins,
                        codegenConfig: codegenConfig,
                    };
                    _c = [__assign({}, defaultConfig)];
                    _e = {};
                    return [4 /*yield*/, (0, graphql_codegen_config_1.generateWithConfig)(defaultConfig)];
                case 1:
                    _d = [[
                            __assign.apply(void 0, _c.concat([(_e.generateFromSchema = _f.sent(), _e)]))
                        ]];
                    return [4 /*yield*/, asyncMap(additionalSchemas, function (_a) { return __awaiter(void 0, void 0, void 0, function () {
                            var codegenConfig, _b;
                            var _c, _d;
                            var schema = _a.schema, config = __rest(_a, ["schema"]);
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _c = { fileName: "graphql-types-" + config.key + ".ts", documentPaths: documentPaths, directory: directory };
                                        return [4 /*yield*/, (0, load_1.loadSchema)(schema, {
                                                loaders: [
                                                    new url_loader_1.UrlLoader(),
                                                    new json_file_loader_1.JsonFileLoader(),
                                                    new graphql_file_loader_1.GraphQLFileLoader(),
                                                ],
                                            })];
                                    case 1:
                                        codegenConfig = __assign.apply(void 0, [(_c.schema = _e.sent(), _c.codegenPlugins = [], _c.codegenConfig = {}, _c.reporter = reporter, _c), config]);
                                        _b = [__assign({}, codegenConfig)];
                                        _d = {};
                                        return [4 /*yield*/, (0, graphql_codegen_config_1.generateWithConfig)(codegenConfig)];
                                    case 2: return [2 /*return*/, __assign.apply(void 0, _b.concat([(_d.generateFromSchema = _e.sent(), _d)]))];
                                }
                            });
                        }); })];
                case 2:
                    configs = __spreadArray.apply(void 0, _d.concat([(_f.sent()), true]));
                    build = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, asyncMap(configs, function (_a) {
                                            var key = _a.key, generateFromSchema = _a.generateFromSchema, schema = _a.schema, fileName = _a.fileName;
                                            return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0: return [4 /*yield*/, generateFromSchema(schema)];
                                                        case 1:
                                                            _b.sent();
                                                            reporter.info("[gatsby-plugin-graphql-codegen] definition for queries of schema " + key + " has been updated at " + fileName);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    // NOTE assume err is an ErrorMeta
                                    if (failOnError) {
                                        reporter.panic(err_1);
                                    }
                                    else {
                                        reporter.warn(err_1);
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    buildDebounce = (0, lodash_debounce_1.default)(build, codegenDelay, {
                        trailing: true,
                        leading: false,
                    });
                    watchStore = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var action, schema, defaultConfig;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    action = store.getState().lastAction;
                                    if (!['REPLACE_STATIC_QUERY', 'QUERY_EXTRACTED'].includes(action.type)) {
                                        return [2 /*return*/];
                                    }
                                    schema = store.getState().schema;
                                    defaultConfig = configs.find(function (_a) {
                                        var key = _a.key;
                                        return key === DEFAULT_SCHEMA_KEY;
                                    });
                                    if (defaultConfig) {
                                        defaultConfig.schema = schema;
                                    }
                                    return [4 /*yield*/, buildDebounce()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    // HACKY: might break when gatsby updates
                    store.subscribe(watchStore);
                    return [4 /*yield*/, build()];
                case 3:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.onPostBootstrap = onPostBootstrap;
