import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'icon-*.png',
        'maskable-icon-512x512.png',
      ],
      manifest: {
        name: 'Diabetes Predictor AI',
        short_name: 'DiabetesAI',
        description: 'AI-powered diabetes risk predictor — fast, private, and installable.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0c29',
        theme_color: '#7c3aed',
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en',
        categories: ['health', 'medical', 'utilities'],
        icons: [
          { src: '/icon-72x72.png',            sizes: '72x72',   type: 'image/png' },
          { src: '/icon-96x96.png',            sizes: '96x96',   type: 'image/png' },
          { src: '/icon-128x128.png',          sizes: '128x128', type: 'image/png' },
          { src: '/icon-144x144.png',          sizes: '144x144', type: 'image/png' },
          { src: '/icon-152x152.png',          sizes: '152x152', type: 'image/png' },
          { src: '/icon-192x192.png',          sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-384x384.png',          sizes: '384x384', type: 'image/png' },
          { src: '/icon-512x512.png',          sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache strategy: network-first for API, cache-first for static assets
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
      devOptions: {
        enabled: true,   // enable SW in dev mode for testing
        type: 'module',
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})

