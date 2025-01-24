<template>
  <div class="w-full h-full">
    <page-section>
      <h1>Submit your idea</h1>
      <p>We know you have a good idea. Now let's put it to the test. We want to help your good idea become a great one.</p>
    </page-section>
    <page-section>
      <form ref="formRef" class="w-full lg:w-1/2 mx-auto border-2 border-yellow-400 shadow-block px-4 py-8" @submit.prevent="submitNewIdea">
        <fieldset>
          <label for="description">
            <h2 class="mb-4">Describe your idea</h2>
          </label>
          <p>In less than 300 characters, describe your idea. This is your elevator pitch.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.description" maxlength="300" placeholder="I want to build a..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.description?.length }} / 300
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label for="description">
            <h2 class="mb-4">What problem does it solve?</h2>
          </label>
          <p>In less than 300 characters, describe the problem your idea solves.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.problem" placeholder="This will solve..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.problem?.length }} / 300
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label for="description">
            <h2>What problem does it solve?</h2>
          </label>
          <p>In less than 300 characters, describe who your idea serves.</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.target" placeholder="My target market is..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.target?.length }} / 300
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
  description: null,
  problem: null,
  target: null
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
      // Store submission in local storage
      localStorage.setItem('new_idea_to_validate', JSON.stringify(formValues));
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
  }
}
</script>

<style scoped>
</style>