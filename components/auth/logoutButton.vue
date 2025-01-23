<template>
  <button class="cta" @click.prevent="signOut">Logout</button>
</template>

<script setup>
const signOut = async () => {
  const signedOut = await $fetch('/api/auth/signOut');
  if (signedOut) useRouter().push('/');
}
</script>