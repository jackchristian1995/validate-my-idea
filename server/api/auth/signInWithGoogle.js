import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  if (error) throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' });

  return data.url;
});