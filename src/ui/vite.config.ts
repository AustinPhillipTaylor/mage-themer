import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig( {
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve( __dirname, 'src' ), 
			},
		],
	},
	build: {
		outDir: '../../build/ui',
		target: 'esnext',
		assetsInlineLimit: 100000000,
		chunkSizeWarningLimit: 100000000,
		cssCodeSplit: false,
		brotliSize: false,
		rollupOptions: {
			inlineDynamicImports: true,
			output: {
				manualChunks: () => 'main.js',
			},
		},
	},
	plugins: [
		vue(),
		viteSingleFile(),
	],
} )
