<template>
  <div class="w-full h-screen flex flex-col justify-center items-center space-y-8">
    <button class="cta" @click="signIn">Sign In With Google</button>
  </div>
</template>

<script setup>
// Use head
useHead({
  title: 'Login'
});

// Login
const signIn = async () => {
  const res = await $fetch('/api/auth/signInWithGoogle');
  window.location.href = res;
}
</script>