<template>
  <form ref="formRef" data-netlify :name="formName" data-netlify-honeypot="bot-field" @submit.prevent="sendForm">
    <input type="hidden" name="form-name" :value="formName" />
    <p v-show="error" class="py-4 text-red-700 font-bold">
      ERROR: {{ error }}
    </p>
    <slot />
    <button ref="submitRef" class="cta">
      {{ submitLabel }}
    </button>
    <p v-show="success" class="py-4 text-green-700 font-bold">
      {{ successMessage }}
    </p>
  </form>
</template>

<script setup>
// Module Imports
import { ref } from 'vue';

// Props
const props = defineProps({
  formName: {
    type: String,
    required: true
  },
  submitLabel: {
    type: String,
    required: false,
    default: 'Submit'
  },
  successMessage: {
    type: String,
    required: false,
    default: 'Success! Your submission was accepted.'
  }
});

// Error Handling
const error = ref(undefined);

// Form Action
const formRef = ref(null);
const submitRef = ref(null);
const success = ref(false);
const sendForm = async () => {
  submitRef.value.disabled = true;
  try {
    // Send form
    formRef.value.reset();
    const formData = new FormData(formRef.value);
    const formRes = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(formData).toString() });
    if (formRes) {
      success.value = true;
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    setTimeout(() => {
      submitRef.value.disabled = false;
      success.value = false;
      error.value = undefined;
    }, 3000);
  }
}
</script>