<template>
  <div class="w-full wrapper">
    <header class="fixed top-0 left-0 z-50 max-w-screen-2xl px-4 w-full mx-auto">
      <nav class="flex flex-row items-center justify-between py-4 w-full bg-background border-b-2 border-yellow-400">
        <nuxt-link to="/" class="leading-none">
          <img class="h-8 w-auto" src="/logos/validate-my-idea-logo-transparent.png" alt="Validate My Idea logo" />
        </nuxt-link>
      </nav>
    </header>
    <main class="max-w-screen-2xl px-4 w-full mx-auto">
      <nuxt-page />
    </main>
    <footer class="py-4 max-w-screen-2xl px-4 w-full mx-auto">
      <p class="mb-0">&copy; Validate My Idea 2025</p>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  padding-top: calc((2 * 1rem) + 2rem); /* header padding + logo height */
}
</style>