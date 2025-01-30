<template>
  <div class="w-full h-full">
    <page-section>
      <h1>Submit your idea</h1>
      <p>We know you have a good idea. Now let's put it to the test. We want to help your good idea become a great one.</p>
    </page-section>
    <page-section>
      <form ref="formRef" class="w-full xl:w-3/4 2xl:w-2/3 mx-auto border-4 border-yellow-400 shadow-block-lg px-4 py-4 relative" @submit.prevent="saveIdea">
        <fieldset>
          <label class="mb-2 block" for="business_name">
            <h2 class="mb-4">Give your concept a name</h2>
          </label>
          <p class="mb-4">If you've already named your business, great! If not, give a brief summary of what it does, e.g. AI-powered startup feedback tool. You can always change this later.</p>
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
            <textarea name="market" id="market" v-model="formValues.market" placeholder="My target market is..." required></textarea>
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
import { reactive, ref, computed } from 'vue';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

// Component Imports
import PageSection from '~/components/ui/PageSection.vue';
import { Loader2 } from 'lucide-vue-next';

// Store Imports
import { useAuthStore } from '~/stores/authStore';

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
const saved = ref(false);
const captchaToken = ref(undefined);
const getToken = (token, ekey) => captchaToken.value = token;

const formValues = reactive({
  name: "AI-powered startup feedback tool",
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
      // Refresh session before going ahead
      await $fetch('/api/auth/verify');
      if (!user.value) {
        // Create anonymous user
        const newUser = await $fetch('/api/auth/signInAsGuest', { method: 'POST', body: { token: captchaToken.value } });
        setUser(newUser);
      }
      if (user.user_metadata.credits < 1) throw new Error('You do not have enough feedback credits to submit this proposal.');
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