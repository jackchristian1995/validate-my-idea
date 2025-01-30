<template>
  <div>
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <nav>
          <ul>
            <li class="list-none mb-4">
              <a href="/">Home</a>
            </li>
            <li class="list-none mb-4">
              <a href="/validator">Startup Validator</a>
            </li>
            <li v-if="user" class="list-none mb-4">
              <a :href="`/feedback/${user.id}`">Your Concepts</a>
            </li>
            <li class="list-none mb-4">
              <a href="/contact">Contact</a>
            </li>
            <hr class="border-t-0 border-b-2 h-1 border-yellow-400 my-8">
            <button v-if="!user || isAnon" class="cta bg-yellow-300" @click.prevent="signInWithGoogle">{{ user ? 'Create Account' : 'Sign In' }}</button>
            <logout-button v-if="user && !isAnon" />
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup>
// Component Imports
import LogoutButton from '~/components/auth/logoutButton.vue';
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '~/components/ui/sheet';
import { Menu } from 'lucide-vue-next';

// Module Imports
import { ref, computed } from 'vue';

// Store Imports
import { useAuthStore } from '~/stores/authStore';

// Error Handling
const error = ref(null);

// Get user info
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
</script>

<style scoped>
section {
  @apply border-b-2 border-yellow-400 py-4;
}
</style>