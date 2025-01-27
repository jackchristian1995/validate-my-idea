export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  // Allow access to the login route without checks
  const allowedUrls = [
    '/',
    '/validator/new',
    '/login/callback',
    '/login',
  ]
  if (allowedUrls.includes(to.path)) return;

  try {
    // Call the server to verify if the user is authenticated
    const verified = await $fetch('/api/auth/verify', { method: 'GET' });
    if (!verified) throw new Error('Unauthorised');
  } catch (error) {
    // If verification fails, redirect to the login page
    return navigateTo('/auth/login');
  }
});
