<template>
  <div class="w-full h-full">
    <page-section>
      <h1>Submit your idea</h1>
      <p>We know you have a good idea. Now let's put it to the test. We want to help your good idea become a great one.</p>
    </page-section>
    <page-section>
      <form ref="formRef" class="w-full xl:w-3/4 2xl:w-2/3 mx-auto border-4 border-yellow-400 shadow-block-lg px-4 py-4 relative" @submit.prevent="saveIdea">
        <fieldset>
          <label for="description">
            <h2 class="mb-4">Describe your idea</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe your idea. This is your elevator pitch.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.product" maxlength="500" placeholder="I want to build a..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.product?.length }} / 500
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label for="problem">
            <h2 class="mb-4">What problem does your idea solve?</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe the problem your idea solves.</p>
          <div class="relative">
            <textarea name="problem" id="problem" v-model="formValues.problem" placeholder="This will solve..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.problem?.length }} / 500
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label for="market">
            <h2>Who does your idea serve?</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe who you are solving the problem for.</p>
          <div class="relative">
            <textarea name="market" id="market" v-model="formValues.market" placeholder="My target market is..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.market?.length }} / 500
            </span>
          </div>
        </fieldset>
        <p v-show="error" class="py-4 font-bold text-red-600">
          ERROR: {{ error }}
        </p>
        <vue-hcaptcha sitekey="143c762c-2a70-4f6c-a304-af30e072c7f4" @verify="getToken"></vue-hcaptcha>
        <button ref="submitRef" class="cta disabled:cursor-none disabled:opacity-50 mt-8" type="submit">
          Submit
        </button>
        <div v-show="userMessage && captchaToken" class="absolute top-0 left-0 px-4 py-8 w-full h-full bg-background/75 z-50 backdrop-blur flex flex-col justify-end">
          {{ userMessage }} <Loader2 class="animate-spin ml-2 h-4" />
        </div>
      </form>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { reactive, ref } from 'vue';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

// Component Imports
import PageSection from '~/components/ui/PageSection.vue';
import { Loader2 } from 'lucide-vue-next';

// Use Head
useHead({
  title: 'New Idea Form'
});

// Form Controls
const submitRef = ref(null);
const formRef = ref(null);
const userMessage = ref(undefined);
const error = ref(undefined);

// Idea concept
const saved = ref(false);
const captchaToken = ref(undefined);
const getToken = (token, ekey) => captchaToken.value = token;

const formValues = reactive({
  product: "I want to create an AI-powered startup concept validation platform. A place for new entrepreneurs to validate their ideas and evolve them into a strong business plan. The AI bases its feedback on the clarity, feasibility, and market differentiation of the user's concept. It provides constructive feedback to gradually guide the user to a much stronger plan for their startup to give them the confidence and momentum to start it.",
  problem: "Many people have business ideas but don't know how to test them or validate them. Without proper idea validation, people risk investing their time and money into a venture doomed to fail. I want to provide a place for people to test and evolve their ideas so that they can feel more confident that they have a strong plan for success and have thought through their idea to the point where it can't get any better.",
  market: "My target market is people like me. Aspiring entrepreneurs who lack the experience and community required to get feedback on their ideas. My platform aims to provide a sounding board where they propose their ideas and get valuable, constructive feedback to help them build a well-thought-out plan for success."
});

const saveIdea = async () => {
  // Disable the form
  submitRef.value.disabled = true;
  userMessage.value = 'Please wait while we analyse your idea.';

  try {    
    // Validate the form concept
    const valid = await $fetch('/api/form/validateIdea', { method: 'POST', body: { ...formValues } });
    if (valid) {
      // Create anonymous user
      const user = await $fetch('/api/auth/signInAsGuest', { method: 'POST', body: { token: captchaToken.value } });
      // Store Concept in DB
      const storedConcept = await $fetch('/api/user/postConcept', { method: 'POST', body: { concept: formValues } });
      
      useRouter().push(`/feedback/${user.id}/${storedConcept[0].id}`);
    }
  } catch (err) {
    console.error(err);
    if (err.statusMessage) {
      error.value = err.statusMessage;
    } else {
      error.value = err.message;
    }
  }
}
</script>