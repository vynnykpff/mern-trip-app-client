import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'!': path.resolve(__dirname, './src/assets/images'),
			'#': path.resolve(__dirname, './src/assets'),
		},
	},
})