import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import VueRouter from 'unplugin-vue-router/vite'
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        VueRouter(),
        Vue({
            template: {transformAssetUrls}
        }),
        Vuetify({
            autoImport: true
        }),
        Components(),
        ViteFonts({
            google: {
                families: [{
                    name: 'Inter',
                    styles: 'wght@100;200;300;400;500;600;700;800;900'
                }]
            }
        })
    ],
    define: {'process.env': {}},
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue'
        ]
    },
    server: {
        port: 3000
    }
})
