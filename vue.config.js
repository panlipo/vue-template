const path = require('path')
module.exports = {

    publicPath: "./", // 部署应用包时的基本 URL

    assetsDir: 'static', //放置生成的静态资源目录

    outputDir: "dist", // build生成的生产环境构建文件的目录

    lintOnSave: true, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码

    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本

    transpileDependencies: [], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来

    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

    chainWebpack: () => { }, //会接收一个基于 webpack-chain 的 ChainableConfig 实例

    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        }
    },

    css: {
        extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中

        sourceMap: false, // 是否为 CSS 开启 source map

        loaderOptions: {}, // 向 CSS 相关的 loader 传递选项

    },

    //parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader

    //pwa: {}, // 向 PWA 插件传递选项

    devServer: {
        open: true,

        host: "127.0.0.1",

        port: 8088,

        https: false,

        hotOnly: false,

        // 代理
        proxy: {
            '/apis': {
                target: 'https://www.hzmuji.com/education',
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }

    }
}