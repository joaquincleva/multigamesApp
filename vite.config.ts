import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@generalComponents', replacement: path.resolve(__dirname, 'src/generalComponents') },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
        { find: '@redux', replacement: path.resolve(__dirname, 'src/redux') },
    ]
}
})
