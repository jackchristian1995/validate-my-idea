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
    recaptchaSecretKey: '',
    claudeApiKey: '',
    public: {
      recaptchaSiteKey: ''
    }
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
    }
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
})