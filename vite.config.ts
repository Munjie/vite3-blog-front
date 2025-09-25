import { defineConfig,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "@rollup/plugin-commonjs"; // 让vite打包支持common.js语法
import AutoImport from "unplugin-auto-import/vite"; // 自动导入组件
import Components from "unplugin-vue-components/vite"; // 自动导入src/components下的组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // 按需导入ep
import viteCompression from "vite-plugin-compression"; // gzip压缩
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // 支持svg
import path from 'path'
export default defineConfig((mode): any => {
    const env = loadEnv(mode.mode, process.cwd());
    return {
        base: "./",
        root: process.cwd(), // 绝对路径
        resolve: {
            // 配置路径别名
            alias:
                // 配置 @ 指代 src
                {
                    '@': path.join(__dirname, './src')
                 /*   find: "@",
                    replacement: resolve(__dirname, "./src"),*/
                },

            extensions: [".js", ".ts", ".vue", ".json"],
        },
        server: {
            host: "0.0.0.0",
            open: true,
            port: +env.VITE_APP_PORT,
            cors: true,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    changeOrigin: true,
                    target: env.VITE_APP_API_URL,
                    rewrite: (path: any) =>
                        path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
                },
            },
        },
        plugins: [
            vue(),
            commonjs(),
            // 压缩
            viteCompression({
                algorithm: 'gzip', // 使用 gzip 压缩
                ext: '.gz', // 生成的文件扩展名
                threshold: 10240, // 仅压缩大于 10KB 的文件
                deleteOriginFile: false, // 是否删除原始文件
                compressionOptions: { level: 9 }, // 压缩级别，1-9，越高压缩率越大
            }),
          // 自动导入element plus组件
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            dts: true,
            dirs: "src/components",
            resolvers: [ElementPlusResolver()], // ElementPlus按需加载
          }),
          // 让vite支持require
          // requireTransform({
          //   fileRegex: /.js$|.vue$/,
          // }),
          // svg
          createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [resolve(process.cwd(), "src/icons/svg")],
          }),
        ],
        css: {
            preprocessorOptions: {
                // 引入全局scss
                scss: {
                    additionalData: `@use "@/styles/base.scss";`,
                },
            },
        },
    };
});