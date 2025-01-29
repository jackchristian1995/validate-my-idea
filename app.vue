<template>
  <div class="w-full wrapper">
    <header class="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-screen-2xl px-4 w-full mx-auto">
      <nav class="flex flex-row items-center justify-start space-x-8 py-4 w-full bg-background border-b-2 border-yellow-400">
        <nuxt-link to="/" class="leading-none mr-auto border-none">
          <img class="h-8 w-auto" src="/logos/validate-my-idea-logo-transparent.png" alt="Validate My Idea logo" />
        </nuxt-link>
        <credit-balance v-if="user" />
        <nuxt-link v-if="user && recentConcept" :to="`/feedback/${user.id}/${recentConcept.id}`" class="cta">Review your feedback</nuxt-link>
        <nuxt-link v-if="useRoute().path === '/'" to="/validator" class="cta">Validate your idea</nuxt-link>
        <button v-if="!user || isAnon" class="cta bg-yellow-300" @click.prevent="signInWithGoogle">{{ user ? 'Create Account' : 'Sign In' }}</button>
        <logout-button v-if="user && !isAnon" />
      </nav>
    </header>
    <main class="max-w-screen-2xl px-4 w-full mx-auto">
      <nuxt-page />
    </main>
    <footer class="py-4 max-w-screen-2xl px-4 w-full mx-auto flex flex-row justify-between items-center">
      <p class="mb-0">&copy; Validate My Idea 2025</p>
    </footer>
  </div>
</template>

<script setup>
// Module Imports
import { computed } from 'vue';

// Component Imports
import CreditBalance from '~/components/nav/CreditBalance.vue';
import logoutButton from '~/components/auth/logoutButton.vue';

// Store Imports
import { useAuthStore } from '~/stores/authStore';
import { useConceptStore } from '~/stores/conceptStore';

// User
const { getUserIsAnon, getUser } = useAuthStore();
const user = computed(() => getUser());
const isAnon = computed(() => getUserIsAnon());
const signInWithGoogle = async () => {
  if (user.value && isAnon.value) {
    const res = await $fetch('/api/auth/linkAnonToGoogle');
    window.location.href = res;
  } else {
    const res = await $fetch('/api/auth/signInWithGoogle');
    window.location.href = res;
  }
}

// Concepts
const { getMostRecentConcept, setConcepts } = useConceptStore();
const recentConcept = computed(() => getMostRecentConcept());

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