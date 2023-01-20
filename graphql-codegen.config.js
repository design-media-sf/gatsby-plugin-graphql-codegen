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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWithConfig = exports.mapCodegenPlugins = void 0;
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var load_1 = require("@graphql-tools/load");
var code_file_loader_1 = require("@graphql-tools/code-file-loader");
var core_1 = require("@graphql-codegen/core");
var graphql_1 = require("gatsby/graphql");
var typescript_1 = require("@graphql-codegen/typescript");
var typescript_operations_1 = require("@graphql-codegen/typescript-operations");
function isSource(result) {
    return typeof result !== 'undefined';
}
var defaultPlugins = {
    plugins: [
        {
            typescript: {
                skipTypename: true,
                enumsAsTypes: true,
            },
        },
        {
            operations: {
                skipTypename: true,
                exportFragmentSpreadSubTypes: true,
            },
        },
    ],
    pluginMap: {
        typescript: {
            plugin: typescript_1.plugin,
        },
        operations: {
            plugin: typescript_operations_1.plugin,
        },
    },
};
var mapCodegenPlugins = function (_a) {
    var codegenPlugins = _a.codegenPlugins, defaultPlugins = _a.defaultPlugins;
    return codegenPlugins.reduce(function (acc, plugin, i) {
        var _a;
        var resolve = plugin.resolve, options = plugin.options, otherOptions = __rest(plugin
        // handle default plugins (typescript, operations)
        , ["resolve", "options"]);
        // handle default plugins (typescript, operations)
        if (typeof resolve === 'string') {
            var added = acc.plugins.find(function (addedPlugin) { return Object.keys(addedPlugin)[0] === resolve; });
            if (!added) {
                throw new Error("[gatsby-plugin-graphql-codegen] Invalid codegenPlugins: " + resolve);
            }
            added[resolve] = __assign(__assign({}, added[resolve]), options);
            // presumably new plugins
        }
        else {
            var identifier = "codegen-plugin-" + i;
            acc.plugins.push((_a = {}, _a[identifier] = options, _a));
            acc.pluginMap[identifier] = __assign({ plugin: resolve }, otherOptions);
        }
        return acc;
    }, defaultPlugins);
};
exports.mapCodegenPlugins = mapCodegenPlugins;
var createConfig = function (_a) {
    var documentPaths = _a.documentPaths, directory = _a.directory, fileName = _a.fileName, reporter = _a.reporter, pluckConfig = _a.pluckConfig, codegenPlugins = _a.codegenPlugins, codegenConfig = _a.codegenConfig;
    return __awaiter(void 0, void 0, void 0, function () {
        var pathToFile, dir, _b, pluginMap, plugins;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pathToFile = path.join(directory, fileName);
                    dir = path.parse(pathToFile).dir;
                    return [4 /*yield*/, fs.ensureDir(dir)];
                case 1:
                    _c.sent();
                    _b = (0, exports.mapCodegenPlugins)({
                        codegenPlugins: codegenPlugins,
                        defaultPlugins: defaultPlugins,
                    }), pluginMap = _b.pluginMap, plugins = _b.plugins;
                    return [2 /*return*/, function (schema) { return __awaiter(void 0, void 0, void 0, function () {
                            var docPromises, results, documents;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        docPromises = documentPaths.map(function (docGlob) { return __awaiter(void 0, void 0, void 0, function () {
                                            var _docGlob;
                                            return __generator(this, function (_a) {
                                                _docGlob = path.join(directory, docGlob);
                                                return [2 /*return*/, (0, load_1.loadDocuments)(_docGlob, {
                                                        pluckConfig: pluckConfig,
                                                        loaders: [new code_file_loader_1.CodeFileLoader()],
                                                    }).catch(function (err) {
                                                        reporter.warn('[gatsby-plugin-graphql-codegen] ' + err.message);
                                                    })];
                                            });
                                        }); });
                                        return [4 /*yield*/, Promise.all(docPromises)];
                                    case 1:
                                        results = _a.sent();
                                        documents = results
                                            .filter(isSource)
                                            .reduce(function (acc, cur) { return acc.concat(cur); }, []);
                                        return [2 /*return*/, {
                                                filename: pathToFile,
                                                schema: (0, graphql_1.parse)((0, graphql_1.printSchema)(schema)),
                                                config: codegenConfig,
                                                documents: documents,
                                                plugins: plugins,
                                                pluginMap: pluginMap,
                                            }];
                                }
                            });
                        }); }];
            }
        });
    });
};
var generateWithConfig = function (initialOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var createConfigFromSchema;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createConfig(initialOptions)];
            case 1:
                createConfigFromSchema = _a.sent();
                return [2 /*return*/, function (schema) { return __awaiter(void 0, void 0, void 0, function () {
                        var config, output;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createConfigFromSchema(schema)];
                                case 1:
                                    config = _a.sent();
                                    return [4 /*yield*/, (0, core_1.codegen)(config)];
                                case 2:
                                    output = _a.sent();
                                    return [2 /*return*/, fs.writeFile(config.filename, output)];
                            }
                        });
                    }); }];
        }
    });
}); };
exports.generateWithConfig = generateWithConfig;
