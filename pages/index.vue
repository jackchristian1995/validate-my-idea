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
      <h2>Why use Validate My Idea?</h2>
      <p>
        There are plenty of online forums and communities for you to validate and grow your ideas. That raises the question, what use is AI startup idea validation and feedback? Let's compare and see.
      </p>
      <table class="w-full lg:w-3/4 mx-auto">
        <thead>
          <tr>
            <th>Validate My Idea</th>
            <th>Human forums</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>✅ Guaranteed response</td>
            <td>❌ Response only if someone feels like it</td>
          </tr>
          <tr>
            <td>✅ Instant feedback</td>
            <td>❌ Waiting and hoping for someone to feedback</td>
          </tr>
          <tr>
            <td>✅ Focused on making your idea work</td>
            <td>❌ May tell you to give up instead of finding a solution</td>
          </tr>
          <tr>
            <td>✅ Wants to see you become successful</td>
            <td>❌ May steal your idea</td>
          </tr>
        </tbody>
      </table>
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
      <h2>Frequently Asked Questions</h2>
      <Accordion default-value="is-good" type="single">
        <AccordionItem value="is-good">
          <AccordionTrigger class="hover:no-underline">
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
          <AccordionTrigger class="hover:no-underline">
            <span>
              When will I know the idea is ready?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Once the AI can no longer find ways to improve your idea, we consider your idea ready. At that point, you can feel confident that you are ready to move into the next stage of your startup journey with a strong concept.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-works">
          <AccordionTrigger class="hover:no-underline">
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