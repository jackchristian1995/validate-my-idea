<template>
  <button class="cta" @click.prevent="signOut">Logout</button>
</template>

<script setup>
// Store Imports
import { useAuthStore } from '~/stores/authStore';

const { setUser } = useAuthStore();
const signOut = async () => {
  const signedOut = await $fetch('/api/auth/signOut');
  if (signedOut) {
    setUser(undefined);
    return useRouter().push('/')
  };
}
</script>