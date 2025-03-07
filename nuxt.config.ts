// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,

  nitro: {
    prerender: {
      routes: [
        '/'
      ]
    }
  },

  runtimeConfig: {
    supabaseProjectUrl: '',
    supabaseApiKey: '',
    supabaseServiceRoleKey: '',
    claudeApiKey: '',
    stripePublishableKey: '',
    stripeSecretKey: '',
    stripeCreditWebhookSecret: ''
  },

  app: {
    head: {
      titleTemplate: '%s - Validate My Idea',
      meta: [
        { name: 'description', content: 'Validate My Idea is a community forum for Indie Hackers and Entrepreneurs to validate and evolve their startup ideas.' }
      ],
      script: [
        {
          async: true,
          src: 'https://accounts.google.com/gsi/client'
        }
      ]
    },
    layoutTransition: {
      appear: true,
      mode: 'out-in',
      name: 'fade'
    },
    pageTransition: {
      appear: true,
      mode: 'out-in',
      name: 'fade'
    }
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
})