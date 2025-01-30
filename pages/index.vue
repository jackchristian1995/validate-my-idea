<template>
  <div>
    <page-section>
      <h1 class="md:w-3/4 xl:w-2/3">
        <strong>Validate Your Startup&nbsp;Idea with Actionable Feedback</strong>
      </h1>
      <p class="text-lg lg:text-2xl">
        The fastest way to refine your idea and take it from concept to reality. No fluff. No wasted time.
      </p>
      <div class="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 justify-start items-start">
        <nuxt-link to="/validator" class="cta">Validate your idea</nuxt-link>
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
      <h2>Founder's Note</h2>
      <p>
        I love building things but often dive straight into building without considering how to turn that product into a business. I built <nuxt-link to="/">Validate My Idea</nuxt-link> as a way for me and other Indie Hackers to sense check our ideas, validate and evolve them into more well-rounded business concepts.
      </p>
      <p>
        The power of Indie Hackers comes from their speed to market. Where they see an opening, they can get to it before anyone else. As an independent maker, anything that can help you get to a product and business faster gives you a greater opportunity to make money and serve your audience. An AI-powered validation system enables that speed and promises to be faster than any human-powered forum ever could be.
      </p>
      <p>
        I hope that <nuxt-link to="/">Validate My Idea</nuxt-link> will be a useful tool for all who use it. I hope it empowers people to take a chance on their "million-dollar idea" and build brilliant products and businesses for the world to use.
      </p>
      <p>
        <strong class="inline-block px-2">Keep on building!</strong>
      </p>
      <p class="italic text-xl"><a href="https://jackchristian.com.au" target="_blank">Jack Christian</a></p>
    </page-section>
    <page-section>
      <h2>Frequently Asked Questions</h2>
      <Accordion default-value="is-good" type="single">
        <AccordionItem value="is-good">
          <AccordionTrigger class="">
            <span>
              Is the <strong>AI feedback</strong> any good?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              We work hard to ensure that our AI does not just give generic advice back to you. We understand that <strong>you are the driving force behind your idea</strong>. With that in mind, our AI only asks you questions to prompt you to think about things from a new perspective to help you grow your vision your way.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="why-ai">
          <AccordionTrigger>
            <span>
              Why use <strong>AI-validation instead of human forums</strong> and online communities?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Human forums and online communities offer great feedback from real people. There is no denying that. What they lack is immediacy. Often posts to communities go ignored or the feedback is just too slow. AI platforms like Validate My Idea offer immediate and reliable feedback to help evolve your idea straightaway.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-works">
          <AccordionTrigger>
            <span>
              How do <strong>feedback credits</strong> work?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Each new concept proposal comes with 1 free feedback credit. This credit pays for one interaction with our feedback AI. If you feel the feedback is worth it and you can see the potential of your idea starting to expand, you can purchase more credits with a full user account. 
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';

// Use Head
useHead({
  title: 'Home'
});
</script>