<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <h1>
      <strong>ERROR: {{ error.statusCode }}</strong>
    </h1>
    <p>
      Something went wrong, try starting again from the homepage.
    </p>
    <a href="/" class="cta">Start again</a>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  error: {
    type: Object
  }
});
</script>