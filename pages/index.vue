<template>
  <div>
    <page-section>
      <h1 class="md:w-3/4 xl:w-2/3">
        <strong>Validate Your Startup&nbsp;Idea with Actionable Feedback</strong>
      </h1>
      <p class="text-xl lg:text-2xl">
        The fastest way to refine your idea and take it from concept to reality. No fluff. No wasted time.
      </p>
      <div class="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 justify-start items-start">
        <nuxt-link to="#sign-up" class="cta">
          Join the waiting list
        </nuxt-link>
        <a href="https://www.producthunt.com/products/validate-my-idea-2" target="_blank" class="cta bg-yellow-300">
          Follow us on Product Hunt
        </a>
      </div>
    </page-section>
    <page-section>
      <h2>
        How It Works
      </h2>
      <p>
        Get structured feedback on your idea, identify key improvements, and create a plan to move forward—all powered by tailored AI guidance.
      </p>
      <ol>
        <li>
          <strong>Submit your idea.</strong> Share your concept using our simple, structured format.
        </li>
        <li>
          <strong>Get tailored feedback.</strong> Receive clear, actionable feedback on what works and what can be improved.
        </li>
        <li>
          <strong>Iterate and refine.</strong> Make changes based on feedback and resubmit your idea for another round of critique. Each iteration takes you closer to a polished plan.
        </li>
      </ol>
    </page-section>
    <page-section>
      <h2>Why choose us?</h2>
      <p>
        If you have a million dollar idea but don’t know where to start, this is the place. We are a community of people with brilliant ideas and experience in bringing them to life. Become part of the community to help grow your ideas and help others grow theirs.
      </p>
      <ol>
        <li>
          <strong>No more guesswork.</strong> Gain clarity and confidence about your idea.
        </li>
        <li>
          <strong>Focus on what matters.</strong> Our AI provides concise, actionable steps so you can make big improvements without feeling overwhelmed.
        </li>
        <li>
          <strong>Tailored to you.</strong> Feedback is customized to your idea, guiding you toward the next big win.
        </li>
        <li>
          <strong>Iterative process.</strong> Refine your idea as many times as you need, at your own pace.
        </li>
      </ol>
    </page-section>
    <page-section>
      <h2>Who is this for?</h2>
      <ol>
        <li>
          <strong>Entrepreneurs</strong> planning their next startup.
        </li>
        <li>
          <strong>Indie hackers</strong> validating a side project.
        </li>
        <li>
          <strong>Anyone with a "million-dollar" idea</strong> who doesn't know where to start.
        </li>
      </ol>
    </page-section>
    <page-section>
      <h2 class="text-4xl lg:text-8xl normal-case font-bold mb-8">Launching soon!</h2>
      <h3 class="text-xl lg:text-3xl uppercase mb-4 font-bold">Sign up for updates!</h3>
      <netlify-form class="lg:w-2/3" submit-label="Sign up" form-name="sign-up" success-message="Thanks for signing up! We will update you as soon as we have any news about Validate My Idea.">
        <label for="email" class="block mb-8">
          <p class="sr-only">Enter your email address...</p>
          <input type="email" name="email" id="email" placeholder="Enter your email address..." required />
        </label>
      </netlify-form>
    </page-section>
  </div>
</template>

<script setup>
// Component Imports
import PageSection from "~/components/ui/PageSection.vue";
import NetlifyForm from '~/components/form/NetlifyForm.vue';

// Use Head
useHead({
  title: 'Home'
});
</script>