<template>
  <div class="w-full wrapper">
    <header class="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-screen-2xl px-4 w-full mx-auto">
      <nav class="flex flex-row items-center justify-between py-4 w-full bg-background border-b-2 border-yellow-400">
        <nuxt-link to="/" class="leading-none">
          <img class="h-8 w-auto" src="/logos/validate-my-idea-logo-transparent.png" alt="Validate My Idea logo" />
        </nuxt-link>
        <nuxt-link v-if="useRoute().path === '/'" to="/validator/new" class="cta">Validate your idea</nuxt-link>
      </nav>
    </header>
    <main class="max-w-screen-2xl px-4 w-full mx-auto">
      <nuxt-page />
    </main>
    <footer class="py-4 max-w-screen-2xl px-4 w-full mx-auto flex flex-row justify-between items-center">
      <p class="mb-0">&copy; Validate My Idea 2025</p>
      <logout-button />
    </footer>
  </div>
</template>

<script setup>
import logoutButton from '~/components/auth/logoutButton.vue';
</script>

<style scoped>
.wrapper {
  padding-top: 70px; /* nav height */
}
</style>