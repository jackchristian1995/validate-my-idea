<template>
  <div class="w-full">
    <page-section v-if="userMeta">
      <h1>
        {{ userMeta.full_name }}
      </h1>
      <p>{{ userMeta.email }}</p>
      <p>Credit Balance: {{ userMeta.credits }}</p>
    </page-section>
    <page-section v-if="user">
      <h2>Concepts</h2>
      <ul v-if="concepts.length">
        <li v-for="concept of concepts" :key="concept.id">
        </li>
      </ul>
      <div v-else>
        <p>No concepts stored just yet.</p>
        <nuxt-link class="cta" to="/validator">Validate your first concept</nuxt-link>
      </div>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { onMounted, ref, computed } from 'vue';

// Component Imports
import PageSection from '~/components/ui/PageSection.vue';

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