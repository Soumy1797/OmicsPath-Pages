import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
export default defineConfig({base: process.env.PAGES_BASE_PATH || '/OmicsPath-Pages/', plugins:[react()], resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}}, build:{outDir:'dist-pages',emptyOutDir:true}});
