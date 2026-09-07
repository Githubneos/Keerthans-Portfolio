import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base matches the GitHub project-page URL (github.com/Githubneos/Keerthans-Portfolio).
// If this repo is ever renamed to Githubneos.github.io, change this to '/'
// and update the router basename fallback + public/404.html pathSegmentsToKeep to 0.
export default defineConfig({
  base: '/Keerthans-Portfolio/',
  plugins: [react(), tailwindcss()],
})
