<template>
  <div class="w-full">
    <page-section>
      <h1>Feedback page</h1>
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
      <form class="w-full xl:w-3/4 2xl:w-2/3 mx-auto border-4 border-yellow-400 shadow-block-lg px-8 py-16">
        <fieldset v-for="section of Object.keys(submission)" :key="section" class="border-b-2 border-yellow-400 pb-16 mb-16 mt-0">
          <label :for="section">
            <h2 class="mb-0">
              {{ section }}
            </h2>
          </label>
          <div class="py-4">
            <div class="my-4">
              <h3 class="mb-2">What works well in your concept</h3>
              <p>{{ feedback[section].strengths }}</p>
            </div>
            <div class="my-4">
              <h3 class="mb-2">How we could strengthen your concept</h3>
              <ul>
                <li v-for="weakness, index of feedback[section].weaknesses" :key="`weakness_${index}`">
                  {{ weakness.issue }}. {{ weakness.prompt }}
                </li>
              </ul>
            </div>
          </div>
          <div class="relative mt-8">
            <textarea v-model="submission[section]" :id="section" :name="section" maxlength="500" placeholder="I want to build a..."></textarea>
            <span class="absolute bottom-0 right-0 px-2 py-1 opacity-50">
              {{ submission[section]?.length }} / 500
            </span>
          </div>
        </fieldset>
      </form>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { onMounted, ref } from 'vue';

// Component Imports
import PageSection from '~/components/ui/PageSection.vue';

// Feedback Data
const feedback = ref({});;
const submission = ref({})
onMounted(() => {
  // Get idea from local storage
  const submissionStorage = localStorage.getItem('validate_my_idea_submission');
  if (submissionStorage) submission.value = JSON.parse(submissionStorage);
  // Get feedback from local storage
  const feedbackStorage = localStorage.getItem('validate_my_idea_feedback');
  if (feedbackStorage) feedback.value = JSON.parse(feedbackStorage)[0];
});
</script>