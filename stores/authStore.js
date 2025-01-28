import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(undefined);

  // Getters
  const getUser = () => user.value;
  const getUserIsAnon = () => user.value.is_anonymous;

  // Setters
  const setUser = (payload) => user.value = payload;

  return { user, setUser, getUser, getUserIsAnon };
}, {
  persist: true
});