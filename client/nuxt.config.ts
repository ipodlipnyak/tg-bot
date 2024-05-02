import { defineNuxtConfig } from 'nuxt/config';
import vuetify from 'vite-plugin-vuetify';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static', // default is 'server'
  ssr: false,
  nitro: {
    devProxy: {
      '/api': 'http://127.0.0.1:3000/api',
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ],
    },
  },
  modules: [
    '@pinia/nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => config.plugins.push(vuetify()));
    },
  ],
});
