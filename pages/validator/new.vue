<template>
  <div class="w-full h-full">
    <page-section>
      <h1>Submit your idea</h1>
      <p>We know you have a good idea. Now let's put it to the test. We want to help your good idea become a great one.</p>
    </page-section>
    <page-section>
      <form ref="formRef" class="w-full xl:w-3/4 2xl:w-2/3 mx-auto border-4 border-yellow-400 shadow-block-lg px-4 py-4" @submit.prevent="submitNewIdea">
        <fieldset>
          <label for="description">
            <h2 class="mb-4">Describe your idea</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe your idea. This is your elevator pitch.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.description" maxlength="500" placeholder="I want to build a..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.description?.length }} / 500
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label for="description">
            <h2 class="mb-4">What problem does your idea solve?</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe the problem your idea solves.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.problem" placeholder="This will solve..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.problem?.length }} / 500
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label for="description">
            <h2>Who does your idea serve?</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe who you are solving the problem for.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.target" placeholder="My target market is..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.target?.length }} / 500
            </span>
          </div>
        </fieldset>
        <p v-show="error" class="py-4 font-bold text-red-600">
          ERROR: {{ error }}
        </p>
        <button ref="submitRef" class="cta disabled:cursor-none disabled:opacity-50" type="submit">
          Submit
        </button>
        <p v-show="userMessage" class="py-8 font-bold flex flex-row justify-start space-x-2 items-center text-green-600 mb-0 leading-none">
          {{ userMessage }} <Loader2 class="animate-spin ml-2 h-4" />
        </p>
      </form>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { reactive, ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';

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

// Recatpcha
const { executeRecaptcha } = useReCaptcha();

// Idea Submission
const formValues = reactive({
  description: "I want to create an AI-powered startup concept validation platform. A place for new entrepreneurs to validate their ideas and evolve them into a strong business plan. The AI bases its feedback on the clarity, feasibility, and market differentiation of the user's concept. It provides constructive feedback to gradually guide the user to a much stronger plan for their startup to give them the confidence and momentum to start it.",
  problem: "Many people have business ideas but don't know how to test them or validate them. Without proper idea validation, people risk investing their time and money into a venture doomed to fail. I want to provide a place for people to test and evolve their ideas so that they can feel more confident that they have a strong plan for success and have thought through their idea to the point where it can't get any better.",
  target: "My target market is people like me. Aspiring entrepreneurs who lack the experience and community required to get feedback on their ideas. My platform aims to provide a sounding board where they propose their ideas and get valuable, constructive feedback to help them build a well-thought-out plan for success."
});

const submitNewIdea = async () => {
  // Disable the form
  submitRef.value.disabled = true;
  userMessage.value = 'Please wait while we analyse your idea.';

  try {    
    // Execute reCAPTCHA and get the token
    const token = await executeRecaptcha('idea_form_submission');    
    if (!token) throw new Error('Recaptcha failed.');
    // Validate the form submission
    const valid = await $fetch('/api/form/validateIdea', { method: 'POST', body: { ...formValues, recaptchaToken: token } });
    if (valid) {
      // Send idea submission to AI for feedback
      const feedback = await $fetch('/api/ideate/getInitialFeedback', { method: 'POST', body: { ...formValues } });
      // Store submission in local storage
      localStorage.setItem('validate_my_idea_submission', JSON.stringify({ ...formValues }));
      // Store feedback in local storage
      localStorage.setItem('validate_my_idea_feedback', JSON.stringify(feedback));
      // Redirect to response page
      useRouter().push('/validator/feedback');
    }
  } catch (err) {
    console.error(err);
    if (err.statusMessage) {
      error.value = err.statusMessage;
    } else {
      error.value = err.message;
    }
  } finally {
    submitRef.value.disabled = false;
    setTimeout(() => {
      error.value = undefined;
      userMessage.value = undefined;
    }, 3000);
  }
}
</script>

<style scoped>
</style>