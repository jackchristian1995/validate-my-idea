<template>
  <div class="w-full relative py-8 lg:py-0 sidebar-container">
    <div class="hidden lg:block sidebar relative lg:absolute lg:top-0 lg:left-0 w-full lg:w-1/4 lg:h-full lg:pr-4 lg:border-r-2 border-yellow-400 lg:overflow-auto">
      <section>
        <h1 :class="['text-2xl lg:text-3xl font-bold uppercase mb-4 w-full', { 'bg-gray-50': !user }]">
          <transition name="fade" mode="out-in">
            <span v-if="user">{{ userMeta.full_name }}</span>
            <span class="opacity-0" v-else>&nbsp;</span>
          </transition>
        </h1>
        <p :class="['mb-0 w-full', { 'bg-gray-50': !user }]">
          <transition name="fade" mode="out-in">
            <span v-if="user">{{ userMeta.email }}</span>
            <span class="opacity-0" v-else>&nbsp;</span>
          </transition>
        </p>
      </section>
      <section>
        <h2>
          Your concepts
        </h2>
        <ul class="list-none">
          <li v-for="concept of concepts" :key="concept.id" class="list-none mb-8">
            <nuxt-link :class="['cta text-left', { 'hollow': !useRoute().path.includes(concept.id)}]" :to="`/feedback/${user?.id}/${concept.id}`">{{ concept.name }}</nuxt-link>
          </li>
          <li class="list-none mb-0">
            <nuxt-link class="cta bg-yellow-300" to="/validator">Propose a new concept</nuxt-link>
          </li>
        </ul>
      </section>
    </div>
    <div class="w-full lg:w-3/4 py-0 lg:py-16 lg:pl-8 lg:pr-4 relative lg:absolute lg:left-1/4 lg:top-0 lg:h-full lg:overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Module Imports
import { onMounted, ref, computed } from 'vue';

// 
useHead({
  bodyAttrs: {
    class: 'lg:h-full lg:overflow-hidden'
  }
});

// Error Handling
const error = ref(null);

// Get user info
const user = ref(null);
const userMeta = computed(() => user.value?.user_metadata);
const concepts = ref(undefined);
onMounted(async () => {
  try {
    user.value = await $fetch('/api/auth/getUser');
    concepts.value = await $fetch('/api/user/getConcepts');
  } catch (err) {
    console.error(err);
    error.value = err.statusMessage
  }
});
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .sidebar-container {
    height: calc(100vh - 70px - 60px); /* screen height - nav height - footer height */
  }
}


.sidebar > section {
  @apply border-b-2 border-yellow-400 py-8;
}
</style>