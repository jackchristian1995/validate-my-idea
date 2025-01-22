<template>
  <div>
    <page-section>
      <h1>
        <strong>Validate Your Startup&nbsp;Idea with Real&nbsp;Feedback</strong>
      </h1>
      <p class="text-xl lg:text-2xl">
        Post your business idea, receive votes and feedback from the community, and refine your concept before launching.
      </p>
      <div class="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 justify-start items-start">
        <nuxt-link to="#sign-up" class="cta">
          Join the community
        </nuxt-link>
        <a href="#" class="cta bg-yellow-300">
          Follow us on Product Hunt
        </a>
      </div>
    </page-section>
    <page-section>
      <h2>
        How it works
      </h2>
      <p>
        How many times do you think you have a great idea but have no way to test it? How good would it be if you were part of a dedicated community that wants to see your idea succeed? That’s where we come in. Here is the community you need to validate and evolve your startup idea before you start building it.
      </p>
      <ol>
        <li>
          <strong>Submit your idea.</strong> Share your concept with the community.&nbsp;💡
        </li>
        <li>
          <strong>Get votes and feedback.</strong> See how your idea resonates with others.&nbsp;👨🏻‍💻
        </li>
        <li>
          <strong>Refine and build.</strong> Use the community insights to perfect your idea before you build it.&nbsp;🛠️
        </li>
      </ol>
    </page-section>
    <page-section>
      <h2>Why choose us?</h2>
      <p>
        If you have a million dollar idea but don’t know where to start, this is the place. We are a community of people with brilliant ideas and experience in bringing them to life. Become part of the community to help grow your ideas and help others grow theirs.
      </p>
      <p>
        <strong>We believe in getting fast and effective feedback so you know whether to continue with your idea or move onto the next one.</strong>
      </p>
    </page-section>
    <page-section>
      <h2 class="text-4xl lg:text-8xl normal-case font-bold mb-8">Launching soon!</h2>
      <h3 class="text-xl lg:text-3xl uppercase mb-4 font-bold">Sign up for updates!</h3>
      <netlify-form class="lg:w-2/3" submit-label="Join the community" form-name="sign-up" success-message="Thanks for signing up! We will update you as soon as we have any news about Validate My Idea.">
        <label for="email" class="block mb-8">
          <p class="sr-only">Enter your email address...</p>
          <input type="email" name="email" id="email" placeholder="Enter your email address..." required />
        </label>
      </netlify-form>
    </page-section>
  </div>
</template>

<script setup>
// Module Imports
import { ref } from 'vue';

// Component Imports
import PageSection from "~/components/ui/PageSection.vue";
import NetlifyForm from '~/components/form/NetlifyForm.vue';
</script>