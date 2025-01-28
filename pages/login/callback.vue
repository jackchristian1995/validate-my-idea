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
      const user = await $fetch('/api/auth/getSessionFromHash', { method: 'POST', body: { hash } });
      console.log(user);
      
      useRouter().push(`/feedback/${user.id}`);
    } catch (err) {
      console.error(err);
    }
  }

});
</script>