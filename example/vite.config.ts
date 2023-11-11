import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import * as path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(),react()],
  resolve: {
    alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
},
})
