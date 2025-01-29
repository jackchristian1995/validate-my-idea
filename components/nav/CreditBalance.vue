<template>
  <div class="border-2 border-yellow-400 py-1 px-2 leading-none flex flex-row items-center justify-center space-x-4">
    <span class="leading-none">{{ creditBalance }}&nbsp;Credits</span>
    <Dialog>
      <DialogTrigger class="leading-none bg-yellow-400 h-6 w-6 font-bold hover:text-yellow-400 hover:bg-gray-900 transition-all">+</DialogTrigger>
      <DialogContent class="rounded-none sm:rounded-none border-4 border-yellow-400 w-auto max-w-none items-center">
        <DialogHeader>
          <DialogTitle class="text-2xl lg:text-3xl font-bold uppercase mb-0">
            Purchase more credits
          </DialogTitle>
          <DialogDescription class="text-base lg:text-lg mb-4 text-gray-900">
            Select from one of the price options below. You can save money through bulk-buying credits but only buy the credits you need.
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="createCheckout">
          <fieldset class="flex flex-row justify-center items-center space-x-8 mb-8 mt-0">
            <div v-for="product of products" :key="product.id" class="relative">
              <label class="relative" :for="product.id" :class="['border-4 cursor-pointer px-4 py-2 border-yellow-400 font-bold', { 'bg-yellow-400': selectedProductId === product.id }]">
                {{ product.quantity }} Credits for &pound;{{ product.price }}
              </label>
              <input class="absolute -top-[100vh] -left-[100vw]" type="radio" name="price" :id="product.id" :value="product.id" v-model="selectedProductId">
            </div>
          </fieldset>
          <button class="cta mx-auto block" type="submit">Buy now</button>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
// Module Imports
import { computed, ref } from 'vue';

// Component Imports
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '~/components/ui/dialog';

// Store Imports
import { useAuthStore } from '~/stores/authStore';

// User's Credit Balance
const { getCreditBalance } = useAuthStore();
const creditBalance = computed(() => getCreditBalance());

// Purchasing Credits
const selectedProductId = ref('price_1QmQavG3ttZtb95uNmsvI1rT');
const selectedProduct = computed(() => products.value.find((p) => p.id === selectedProductId.value));
const products = ref([
  {
    quantity: 1,
    price: 1,
    id: 'price_1QmPHYG3ttZtb95uMIDZggWR'
  },
  {
    quantity: 3,
    price: 2,
    id: 'price_1QmQavG3ttZtb95uNmsvI1rT'
  },
  {
    quantity: 5,
    price: 4,
    id: 'price_1QmQc7G3ttZtb95u2SQCI0GE'
  }
]);

const createCheckout = async () => {
  try {
    // Refresh session to get up to date user and session data for checkout
    await $fetch('/api/auth/verify');
    // Create a new Stripe checkout URL
    const checkout = await $fetch('/api/stripe/createCheckout', { method: 'POST', body: { product: selectedProduct.value, cancelUrl: location.href } });
    window.location.href = checkout;
  } catch (error) {
    console.error(error.message);
  }
}
</script>