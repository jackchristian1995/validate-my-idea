<template>
  <div class="w-full">
    <header class="pb-8 mb-8 border-b-2 border-yellow-400">
      <h1 :class="['w-full', { 'bg-gray-50': !concept.name }]">
        <transition name="fade" mode="out-in">
          <strong v-if="concept.name">{{ concept.name }}</strong>
          <span v-else>&nbsp;</span>
        </transition>
      </h1>
      <transition name="fade" mode="out-in" appear>
        <div v-if="!ideaPerfected && feedback.product && feedback.market && feedback.problem">
          <p class="font-bold">
            We've listed our feedback for your proposal below. Don't take things personally, we all want the same thing... to get the best out of your idea.
          </p>
          <p>
            Read through our comments and suggested improvements. Think about what we have said and then update your proposal in the textbox.
          </p>
          <p class="mb-0">
            When you are ready, send it off for another round of feedback. 🚀🚀🚀
          </p>
        </div>
      </transition>
    </header>
    <main v-if="feedback.product && feedback.market && feedback.problem">
      <transition name="fade" mode="out-in" appear>
        <form v-if="concept.name && !ideaPerfected" class="w-full relative" @submit.prevent="getFeedback">
          <fieldset v-for="section of Object.keys(feedback)" :key="section" class="border-b-2 border-yellow-400 pb-16 mb-16 mt-0">
            <label :for="section">
              <h2 class="mb-8">
                {{ getHeading(section) }}
              </h2>
            </label>
            <div v-if="feedback[section]" class="py-4">
              <h3>Feedback score: <span v-if="feedback[section]" :class="{ 'text-green-500': feedback[section]?.score === 5 }">{{ feedback[section]?.score }}&nbsp;/&nbsp;5</span></h3>
              <div class="my-4">
                <h3 class="mb-2">What works well in your concept</h3>
                <p class="mb-0">{{ feedback[section].strengths }}</p>
              </div>
              <div v-if="feedback[section].weaknesses" class="my-4">
                <h3 class="mb-2">How we could strengthen your concept</h3>
                <p class="mb-0">
                  {{ feedback[section].weaknesses }}
                </p>
              </div>
            </div>
            <div class="relative mt-4">
              <textarea v-model="concept[section]" :id="section" :name="section" maxlength="500" :disabled="feedback[section]?.score === 5" placeholder="I want to build a..."></textarea>
              <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
                {{ concept[section]?.length }} / 500
              </span>
            </div>
          </fieldset>
          <p v-show="error" class="py-4 font-bold text-red-600">
            Sorry, it looks like that didn't work. Please try again.
          </p>
          <div class="block lg:flex lg:flex-row lg:space-x-8 lg:justify-start lg:items-center">
            <button ref="submitBtnRef" type="submit" v-if="!ideaPerfected && feedback && creditBalance > 0" class="cta">Submit for feedback</button>
            <p v-if="creditBalance < 1" class="font-bold text-red-600">
              Please purchase more credits for more feedback.
            </p>
          </div>
          <div v-show="userMessage" class="absolute top-0 left-0 px-4 py-8 w-full h-full bg-background/75 z-50 backdrop-blur flex flex-col justify-end font-bold text-center">
            <Loader2 class="animate-spin mx-auto mb-4 h-4" />
            <span>
              {{ userMessage }} 
            </span>
          </div>
        </form>
      </transition>
      <transition name="fade" mode="out-in" appear>
        <article v-if="ideaPerfected">
          <section v-for="section of Object.keys(feedback)" :key="section">
            <h2>{{ getHeading(section) }}</h2>
            <p>
              {{ concept[section] }}
            </p>
            <p>
              {{ feedback[section].strengths }}
            </p>
          </section>
        </article>
      </transition>
    </main>
  </div>
</template>

<script setup>
// Module Imports
import { onMounted, reactive, computed, ref } from 'vue';

// Component Imports
import { Loader2 } from 'lucide-vue-next';

// Store Imports
import { useConceptStore } from '~/stores/conceptStore';
import { useAuthStore } from '~/stores/authStore';

// Use Head
useHead({
  title: 'Feedback'
});

// Page Meta
definePageMeta({
  layout: 'feedback'
});

// User Data
const { setUser, getCreditBalance } = useAuthStore();
const creditBalance = computed(() => getCreditBalance());

// Error Handling
const error = ref(undefined);

// Page Headings
const getHeading = (section) => {
  if (section === 'product') return 'Your product';
  if (section === 'problem') return 'The problem you solve';
  if (section === 'market') return 'Your target market';
}

// Concept Data
const { getConceptById, setConcepts } = useConceptStore();
const concept = computed(() => {
  const id = useRoute().path.split('/')[3];
  return getConceptById(id);
});

// Feedback Data
const feedback = reactive({
  product: null,
  problem: null,
  market: null
});

onMounted(async () => {
  try {
    const id = useRoute().path.split('/')[3];
    if (!concept.name) {
      // Get idea from DB
      const conceptRes = await $fetch('/api/user/getConcepts');
      setConcepts(conceptRes);
    }
    // Check if feedback exists
    let feedbackRes = await $fetch('/api/user/getFeedback', { method: 'POST', body: { id } });
    if (!feedbackRes) {
      // If feedback does not already exist then generate new feedback
      feedbackRes = await $fetch('/api/ideate/getInitialFeedback', { method: 'POST', body: { ...concept.value } });
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
const userMessage = ref(undefined);
const getFeedback = async () => {
  // Check credit balance
  if (creditBalance.value < 1) throw new Error('You are out of feedback credits. Please purchase more for more feedback.');

  userMessage.value = 'Please wait while we analyse your proposal.';
  error.value = undefined;
  try {
    // Refresh session before going ahead
    await $fetch('/api/auth/verify');
    const id = useRoute().path.split('/')[3];
    // Store new concept in DB
    await $fetch('/api/user/updateConcept', { method: 'POST', body: { id, concept: { ...concept.value } } });
    // Send concept for feedback
    const aiFeedback = await $fetch('/api/ideate/getAdditionalFeedback', { method: 'POST', body: { feedback, concept: concept.value } });
    // Store feedback in DB
    await $fetch('/api/user/updateFeedback', { method: 'POST', body: { id, feedback: aiFeedback[0] } });
    // Update credit balance
    const credits = await $fetch('/api/user/useCredit');
    setUser(credits);
    // Add feedback to view
    feedback.product = aiFeedback[0].product;
    feedback.problem = aiFeedback[0].problem;
    feedback.market = aiFeedback[0].market;
  } catch (err) {
    error.value = err.message;
  } finally {
    userMessage.value = undefined;
  }
}

// Perfected the idea
const ideaPerfected = computed(() => feedback?.product?.score === 5 && feedback?.problem?.score === 5 && feedback?.market?.score === 5)
</script>