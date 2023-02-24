"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
const Path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const n_config_1 = require("@nivinjoseph/n-config");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const Zlib = require("zlib");
const env = n_config_1.ConfigurationManager.getConfig("env");
console.log("WEBPACK ENV", env);
const isDev = env === "dev";
const tsLoader = {
    loader: "ts-loader",
    options: {
        configFile: "tsconfig.client.json",
        transpileOnly: true
    }
};
const moduleRules = [
    {
        test: /\.(scss|sass)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            },
            {
                loader: "css-loader",
                options: {
                    esModule: false
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [
                            "postcss-flexbugs-fixes",
                            autoprefixer({
                                flexbox: "no-2009"
                            })
                        ]
                    }
                }
            },
            {
                loader: "sass-loader"
            }
        ]
    },
    {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            },
            {
                loader: "css-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader",
                    esModule: false,
                    name: (_resourcePath, _resourceQuery) => {
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name].[ext]";
                        }
                        return "[contenthash]-[name].[ext]";
                    }
                }
            },
            {
                loader: "@nivinjoseph/n-app/dist/loaders/raster-image-loader.js",
                options: {
                    jpegQuality: 80,
                    pngQuality: 60
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            isDev ? "file-loader" : {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader"
                }
            }
        ]
    },
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [tsLoader]
    },
    {
        test: /-resolver\.ts$/,
        use: [
            { loader: "@nivinjoseph/n-app/dist/loaders/resolver-loader.js" },
            tsLoader
        ]
    },
    {
        test: /-view-model\.ts$/,
        use: [
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-model-loader.js",
                options: {
                    hmrView: "templates"
                }
            },
            tsLoader
        ]
    },
    {
        test: /-view-model\.js$/,
        use: [
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-model-loader.js",
                options: {
                    hmrView: "templates"
                }
            }
        ]
    },
    {
        test: /\.taskworker\.ts$/,
        use: [
            {
                loader: "worker-loader",
                options: {
                    esModule: false,
                    filename: "[name].[contenthash].worker.js",
                    chunkFilename: "[id].[contenthash].worker.js"
                }
            },
            tsLoader
        ]
    },
    {
        test: /-view\.html$/,
        exclude: [Path.resolve(__dirname, "src/server")],
        use: [
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-ts-check-loader.js"
            },
            {
                loader: "vue-loader/lib/loaders/templateLoader.js"
            },
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-loader.js"
            },
            {
                loader: "html-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /-view\.html$/,
        include: [Path.resolve(__dirname, "src/server")],
        use: [
            {
                loader: "html-loader",
                options: {
                    esModule: false
                }
            }
        ]
    }
];
const plugins = [
    new ForkTsCheckerWebpackPlugin({
        async: isDev,
        typescript: {
            configFile: "tsconfig.client.json",
            configOverwrite: {
                compilerOptions: { skipLibCheck: true, sourceMap: true, inlineSourceMap: false, declarationMap: false }
            }
        }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "src/server/controllers/index-view.html",
        filename: "index-view.html",
        hash: true,
        minify: false
    }),
    new HtmlWebpackTagsPlugin({
        append: false,
        usePublicPath: false,
        tags: [
            "/jquery/jquery.min.js"
        ]
    }),
    new MiniCssExtractPlugin({}),
    new webpack.DefinePlugin({
        APP_CONFIG: JSON.stringify({})
    }),
    new webpack.NormalModuleReplacementPlugin(/element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/, "element-ui/lib/locale/lang/en"),
    new webpack.ProvidePlugin(Object.assign({ $: "jquery" }, Object.keys(require("tslib"))
        .reduce((acc, key) => {
        acc[key] = ["tslib", key];
        return acc;
    }, {}))),
    new MomentLocalesPlugin()
];
if (isDev) {
    plugins.push(new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/]
    }));
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
else {
    moduleRules.push({
        test: /\.js$/,
        include: [
            Path.resolve(__dirname, "src/client"),
            Path.resolve(__dirname, "src/sdk")
        ],
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }
    });
    plugins.push(...[
        new CompressionPlugin({
            test: /\.(js|css|svg)$/,
            algorithm: "brotliCompress",
            compressionOptions: {
                params: {
                    [Zlib.constants.BROTLI_PARAM_QUALITY]: Zlib.constants.BROTLI_MAX_QUALITY
                }
            }
        })
    ]);
}
module.exports = {
    context: process.cwd(),
    mode: isDev ? "development" : "production",
    target: "web",
    entry: {
        main: ["./src/client/client.ts", isDev ? "webpack-hot-middleware/client" : null].where(t => t != null)
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: Path.resolve(__dirname, "src/client/dist"),
        publicPath: "/"
    },
    devtool: isDev ? "source-map" : false,
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new TerserPlugin({
                exclude: /(vendors|\.worker)/,
                terserOptions: {
                    keep_classnames: false,
                    keep_fnames: false,
                    safari10: true,
                    mangle: true,
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: moduleRules
    },
    plugins: plugins,
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify")
        },
        extensions: [".ts", ".js"],
        symlinks: false,
        alias: {
            vue: isDev ? "@nivinjoseph/vue/dist/vue.js" : "@nivinjoseph/vue/dist/vue.runtime.common.prod.js",
            "tslib$": "tslib/tslib.es6.js"
        }
    }
};
//# sourceMappingURL=webpack.config.js.map