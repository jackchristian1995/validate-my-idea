<template>
  <div class="w-full">
    <page-section>
      <h1 class="md:w-3/4 xl:w-2/3">
        <strong v-if="concept">{{ concept.name }}</strong>
        <span v-else>Feedback</span>
      </h1>
      <p class="font-bold">
        We've listed our feedback for your proposal below. Don't take things personally, we all want the same thing... to get the best out of your idea.
      </p>
      <p>
        Read through our comments and suggested improvements. Think about what we have said and then update your proposal in the textbox.
      </p>
      <p>
        When you are ready, send it off for another round of feedback. 🚀🚀🚀
      </p>
    </page-section>
    <page-section>
      <form v-if="concept" class="w-full xl:w-3/4 2xl:w-2/3 mx-auto border-4 border-yellow-400 shadow-block-lg px-8 py-16" @submit.prevent="getFeedback">
        <fieldset v-for="section of Object.keys(feedback)" :key="section" class="border-b-2 border-yellow-400 pb-16 mb-16 mt-0">
          <label :for="section">
            <h2 class="mb-0">
              {{ section }} - <span v-if="feedback[section]" :class="{ 'text-green-500': feedback[section]?.score === 5 }">{{ feedback[section]?.score }}&nbsp;/&nbsp;5</span>
            </h2>
          </label>
          <div v-if="feedback[section]" class="py-4">
            <div class="my-4">
              <h3 class="mb-2">What works well in your concept</h3>
              <p>{{ feedback[section].strengths }}</p>
            </div>
            <div v-if="feedback[section].weaknesses" class="my-4">
              <h3 class="mb-2">How we could strengthen your concept</h3>
              <p>
                {{ feedback[section].weaknesses }}
              </p>
            </div>
          </div>
          <div class="relative mt-8">
            <textarea v-model="concept[section]" :id="section" :name="section" maxlength="500" :disabled="feedback[section]?.score === 5" placeholder="I want to build a..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ concept[section]?.length }} / 500
            </span>
          </div>
        </fieldset>
        <div class="block lg:flex lg:flex-row lg:space-x-8 lg:justify-start lg:items-center">
          <button v-if="!ideaPerfected && feedback" class="cta">Get feedback</button>
          <button v-if="!user" clas="cta bg-yellow-300">Save feedback for later</button>
        </div>
      </form>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { onMounted, reactive, computed } from 'vue';

// Component Imports
import PageSection from '~/components/ui/PageSection.vue';

// Store Imports
import { useConceptStore } from '~/stores/conceptStore';
import { useAuthStore } from '~/stores/authStore';

// Use Head
useHead({
  title: 'Feedback'
});

// User Date
const { getUser, setUser } = useAuthStore();
const user = computed(() => getUser());
const userMeta = computed(() => getUser().user_metadata);

// Concept Data
const concept = reactive({
  name: null,
  product: null,
  problem: null,
  market: null
});
const { getConceptById } = useConceptStore();

// Feedback Data
const feedback = reactive({
  product: null,
  problem: null,
  market: null
});

onMounted(async () => {
  try {
    let conceptRes;
    const id = useRoute().path.split('/')[3];
    // Check if concept available in store
    conceptRes = getConceptById(id);
    if (!conceptRes) {
      // Get idea from DB
      conceptRes = await $fetch('/api/user/getConcept', { method: 'POST', body: { id } });
    }
    concept.product = conceptRes.product;
    concept.problem = conceptRes.problem;
    concept.market = conceptRes.market;
    concept.name = conceptRes.name;
    // Check if feedback exists
    let feedbackRes = await $fetch('/api/user/getFeedback', { method: 'POST', body: { id } });
    if (!feedbackRes) {
      // If feedback does not already exist then generate new feedback
      feedbackRes = await $fetch('/api/ideate/getInitialFeedback', { method: 'POST', body: { ...conceptRes } });
      // Store feedback in DB
      await $fetch('/api/user/postFeedback', { method: 'POST', body: { id, feedback: feedbackRes } });
    }
    // Add feedback to view
    feedback.product = feedbackRes.product;
    feedback.problem = feedbackRes.problem;
    feedback.market = feedbackRes.market;
  } catch (err) {
    console.error(err.message);
  }
});

// Get Additional Feedback
const getFeedback = async () => {
  const id = useRoute().path.split('/')[2];
  // Store new concept in DB
  await $fetch('/api/user/updateConcept', { method: 'POST', body: { id, concept: { ...concept } } });
  // Send concept for feedback
  const aiFeedback = await $fetch('/api/ideate/getAdditionalFeedback', { method: 'POST', body: { feedback, concept } });
  // Store feedback in DB
  await $fetch('/api/user/updateFeedback', { method: 'POST', body: { id, feedback: aiFeedback[0] } });
  // Update credit balance
  const credits = await $fetch('/api/user/useCredit');
  setUser(credits);
  // Add feedback to view
  feedback.product = aiFeedback[0].product;
  feedback.problem = aiFeedback[0].problem;
  feedback.market = aiFeedback[0].market;
}

// Perfected the idea
const ideaPerfected = computed(() => feedback?.product?.score === 5 && feedback?.problem?.score === 5 && feedback?.market?.score === 5)
</script>