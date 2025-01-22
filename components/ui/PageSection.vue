<template>
  <section class="border-b-2 border-yellow-400/75 w-full py-16">
    <slot />
  </section>
</template>

<style scoped>
section :deep(:last-child) {
  margin-bottom: 0;
}
</style>