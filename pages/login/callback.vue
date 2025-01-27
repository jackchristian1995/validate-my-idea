<template>
  <div class="w-full h-full">

  </div>
</template>

<script setup>
// Auth Flow
onMounted(async () => {
  const { hash, path } = useRoute();
  if (hash.includes('refresh_token')) {
    window.history.pushState({}, null, path);
    try {
      await $fetch('/api/auth/getSessionFromHash', { method: 'POST', body: { hash } });
      useRouter().push('/account');
    } catch (err) {
      console.error(err);
    }
  }

});
</script>