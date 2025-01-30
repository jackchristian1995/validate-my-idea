<template>
  <div class="w-full wrapper">
    <header class="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-screen-2xl px-4 w-full mx-auto">
      <nav class="flex flex-row items-center justify-between py-4 w-full bg-background border-b-2 border-yellow-400 relative">
        <nuxt-link to="/" class="leading-none mr-auto border-none">
          <img class="h-8 w-auto" src="/logos/validate-my-idea-logo-transparent.png" alt="Validate My Idea logo" />
        </nuxt-link>
        <nuxt-link v-if="useRoute().path === '/'" class="hidden md:block ml-0 cta absolute left-1/2 -translate-x-1/2" to="/validator">Validate your startup now</nuxt-link>
        <credit-balance v-if="user" />
        <main-navigation />
      </nav>
    </header>
    <main class="max-w-screen-2xl px-4 w-full mx-auto">
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </main>
    <footer class="max-w-screen-2xl px-4 w-full mx-auto">
      <div class="w-full py-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-t-2 border-yellow-400">
        <p class="mb-0">&copy; Validate My Idea 2025</p>
        <div class="flex flex-col md:flex-row items-start md:items-center justify-end space-y-4 md:space-y-0 md:space-x-8">
          <nuxt-link to="/privacy-policy">Privacy&nbsp;Policy</nuxt-link>
          <nuxt-link to="/terms-and-conditions">Terms&nbsp;and&nbsp;Conditions</nuxt-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Module Imports
import { computed } from 'vue';

// Component Imports
import CreditBalance from '~/components/nav/CreditBalance.vue';
import MainNavigation from '~/components/nav/MainNavigation.vue';

// Store Imports
import { useAuthStore } from '~/stores/authStore';
import { useConceptStore } from '~/stores/conceptStore';

// User
const { getUser } = useAuthStore();
const user = computed(() => getUser());

// Concepts
const { setConcepts } = useConceptStore();

onMounted(async () => {
  if (user.value) {
    const conceptsRes = await $fetch('/api/user/getConcepts');
    setConcepts(conceptsRes);
  }
})
</script>

<style scoped>
.wrapper {
  padding-top: 70px; /* nav height */
}
</style>