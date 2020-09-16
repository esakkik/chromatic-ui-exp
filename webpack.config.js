const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const ROOT = path.resolve(__dirname, ".");
const SOURCE = path.join(ROOT, "src");
const DEST = path.join(ROOT, "build");

const PATHS = {
  appPackageJson: path.join(SOURCE, "package.json"),
  appSrc: SOURCE,
  appBuild: DEST,
  appHtml: path.join(SOURCE, "index.html"),
  appIndex: path.join(SOURCE, "index.tsx"),
  appPath: ROOT,
  appNodeModules: path.join(ROOT, "node_modules"),
  appPolyfillJs: path.join(SOURCE, "polyfills"),
};

const IS_PROD = process.env.NODE_ENV === 'production';

const devPlugins = [
    new CleanWebpackPlugin(),
];
const prodPlugins = [
    new CleanWebpackPlugin(),
];
const devServer = {
    contentBase: PATHS.appBuild,
    port: 8000,
    hot: true,
};
const optimization = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                parser: { ecma: 8 },
                compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: false,
                    inline: 2,
                },
                mangle: { safari10: true,},
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                },
            },
            sourceMap: true //TODO: FROM env
        })
    ],
    splitChunks: {
        chunks: 'all',
        name: false,
    },
    runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
    },
};
const tsLoader = {
    test: /\.(ts|tsx)$/,
    use: [ 'ts-loader' ],
    exclude: /node_modules/
};

const loaders = {
    rules: [
        tsLoader,
    ]
}
const WEBPACK_CONFIG = {
    entry: {
        main: PATHS.appIndex,
    },
    output: {
        filename: IS_PROD ? '[name].[contenthash:8].js' : '[name].js',
        chunkFilename: IS_PROD ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
        path: PATHS.appBuild,
    },
    module: loaders,
    plugins: IS_PROD ? prodPlugins : devPlugins,
    optimization: IS_PROD ? optimization : undefined,
    mode: IS_PROD ? 'production' : 'development',
    devtool: IS_PROD ? undefined : 'inline-source-map',
    resolve: { extensions: ['.js','.ts', '.jsx', '.tsx'] },
    target: 'web',
    devServer: IS_PROD ? undefined : devServer,
};
module.exports = WEBPACK_CONFIG;