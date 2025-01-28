import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  // Allow access to the login route without checks
  const allowedUrls = [
    '/',
    '/validator',
    '/login/callback',
    '/login',
  ]

  try {
    // Call the server to verify if the user is authenticated
    const verified = await $fetch('/api/auth/verify', { method: 'GET' });
    if (!verified) throw new Error('Unauthorised');
    
    const authStore = useAuthStore(useNuxtApp().$pinia);
    authStore.setUser(verified);
    if (verified.is_anonymous) {
      const urlBlacklist = [
        '/account' 
      ]
      if (urlBlacklist.includes(to.path)) return navigateTo('/login');
    }
    if (to.path.includes('/feedback/')) {
      if (!to.path.includes(verified.id)) return navigateTo('/login')
    }
  } catch (error) {
    // If verification fails, redirect to the login page unless url is whitelisted
    if (allowedUrls.includes(to.path)) return;
    return navigateTo('/auth/login');
  }
});
