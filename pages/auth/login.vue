<template>
  <div class="w-full h-full flex flex-col justify-center items-center space-y-8">
    <button @click="signIn">Sign In With Google</button>
  </div>
</template>

<script setup>
const signIn = async () => {
  const res = await $fetch('/api/auth/signInWithGoogle');
  window.location.href = res;
}
</script>