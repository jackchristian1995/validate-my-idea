<template>
  <div class="w-full">
    <header class="py-8 lg:py-16">
      <h1>Feedback</h1>
      <p class="font-bold">
        We've listed our feedback for your proposal below. Don't take things personally, we all want the same thing... to get the best out of your idea.
      </p>
      <p>
        Read through our comments and suggested improvements. Think about what we have said and then update your proposal in the textbox.
      </p>
      <p class="mb-0">
        When you are ready, send it off for another round of feedback. 🚀🚀🚀
      </p>
    </header>
    <main class="lg:hidden pb-8">
      <h2>
          Your concepts
        </h2>
        <ul v-if="concepts" class="list-none">
          <li v-for="concept of concepts" :key="concept.id" class="list-none mb-8">
            <nuxt-link :to="`/feedback/${user?.id}/${concept?.id}`">{{ concept?.name }}</nuxt-link>
          </li>
          <li class="list-none mb-0">
            <nuxt-link class="cta bg-yellow-300" to="/validator">Propose a new concept</nuxt-link>
          </li>
        </ul>
    </main>
  </div>
</template>

<script setup>
// Error Handling
const error = ref(null);

// Page Meta
definePageMeta({
  layout: 'feedback'
});

// Get user info
const user = ref(null);
const concepts = ref([]);
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