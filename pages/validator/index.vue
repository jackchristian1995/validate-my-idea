<template>
  <div class="w-full">
    <page-section>
      <h1>Tell us your concept</h1>
      <p>You have an idea for a startup. Now it's time to validate it and flesh it out into a proper business concept.</p>
      <p>Complete the form below with as much detail as you can. Then, our AI will analyse your idea and provide feedback on the clarity, and feasibility of your idea. Together we will iterate on your idea and evolve it into a strong business concept that stands out from the competition. 🚀🚀🚀</p>
    </page-section>
    <page-section>
      <form ref="formRef" class="w-full xl:w-3/4 2xl:w-2/3 mx-auto border-4 border-yellow-400 px-4 py-4 relative" @submit.prevent="saveIdea">
        <fieldset>
          <label class="mb-2 block" for="business_name">
            <h2 class="mb-4">Name your startup</h2>
          </label>
          <p class="mb-4">If you've already named your business, great! If not, give a brief summary of what it does, e.g. AI-powered startup feedback&nbsp;tool.</p>
          <div class="relative">
            <input name="business_name" id="business_name" v-model="formValues.name" maxlength="200" required />
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.name?.length }} / 200
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label class="mb-2 block" for="description">
            <h2 class="mb-4">Describe your product</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe your startup concept. What does your startup do? What are you going to sell?</p>
          <div class="relative">
            <textarea name="description" id="description" v-model="formValues.product" maxlength="500" required></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.product?.length }} / 500
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label class="mb-2 block" for="problem">
            <h2 class="mb-4">What problem will your startup solve?</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe the problem your startup concept solves. How does your startup improve people's lives?</p>
          <div class="relative">
            <textarea name="problem" id="problem" v-model="formValues.problem" required></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.problem?.length }} / 500
            </span>
          </div>
        </fieldset>
        <fieldset>
          <label class="mb-2 block" for="market">
            <h2>Who does your startup serve?</h2>
          </label>
          <p class="mb-4">In less than 500 characters, describe who you are solving the problem for. Who will use your product? Why should they use you over your competitors?</p>
          <div class="relative">
            <textarea name="market" id="market" v-model="formValues.market" required></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ formValues.market?.length }} / 500
            </span>
          </div>
        </fieldset>
        <p v-show="error" class="py-4 font-bold text-red-600">
          ERROR: {{ error }}
        </p>
        <p class="mb-12 font-bold">
          By submitting this proposal, you agree to our <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link> and our <nuxt-link to="/terms-and-conditions">Terms and Conditions</nuxt-link>.
        </p>
        <vue-hcaptcha sitekey="143c762c-2a70-4f6c-a304-af30e072c7f4" @verify="getToken"></vue-hcaptcha>
        <button ref="submitRef" class="cta disabled:cursor-none disabled:opacity-50 mt-8" type="submit">
          Submit your proposal
        </button>
        <div v-show="userMessage && captchaToken" class="absolute top-0 left-0 px-4 py-8 w-full h-full bg-background/75 z-50 backdrop-blur flex flex-col justify-end font-bold text-center">
          <Loader2 class="animate-spin mx-auto mb-4 h-4" />
          <span>
            {{ userMessage }} 
          </span>
        </div>
      </form>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { reactive, ref, computed } from 'vue';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

// Component Imports
import PageSection from '~/components/ui/PageSection.vue';
import { Loader2 } from 'lucide-vue-next';

// Store Imports
import { useAuthStore } from '~/stores/authStore';
import { useConceptStore } from '~/stores/conceptStore';

// Use Head
useHead({
  title: 'New Idea Form'
});

// User data
const { getUser, setUser } = useAuthStore();
const user = computed(() => getUser());

// Form Controls
const submitRef = ref(null);
const formRef = ref(null);
const userMessage = ref(undefined);
const error = ref(undefined);

// Idea concept
const { pushConcept, getConcepts } = useConceptStore();
const saved = ref(false);
const captchaToken = ref(undefined);
const getToken = (token, ekey) => captchaToken.value = token;

const formValues = reactive({
  name: null,
  product: null,
  problem: null,
  market: null
});

const saveIdea = async () => {
  // Disable the form
  submitRef.value.disabled = true;
  userMessage.value = 'Please wait while we analyse your idea.';

  try {    
    // Validate the form concept
    const valid = await $fetch('/api/form/validateIdea', { method: 'POST', body: { ...formValues } });
    if (valid) {
      if (!user.value) {
        // Create anonymous user
        const newUser = await $fetch('/api/auth/signInAsGuest', { method: 'POST', body: { token: captchaToken.value } });
        setUser(newUser);
      }
      if (user.value.user_metadata.credits < 1) throw new Error('You do not have enough feedback credits to submit this proposal.');
      // Store Concept in DB
      const storedConcept = await $fetch('/api/user/postConcept', { method: 'POST', body: { concept: formValues } });
      pushConcept({ ...formValues });
      console.log(getConcepts());
      
      useRouter().push(`/feedback/${user.value.id}/${storedConcept[0].id}`);
    }
  } catch (err) {
    console.error(err);
    if (err.statusMessage) {
      error.value = err.statusMessage;
    } else {
      error.value = err.message;
    }
    submitRef.value.disabled = false;
  } finally {
    userMessage.value = undefined;
  }
}
</script>