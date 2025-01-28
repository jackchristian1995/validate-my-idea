import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.auth.linkIdentity({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/login/callback'
    }
  });

  if (error) throw createError({ statusCode: 401, statusMessage: error.message });

  return data.url;
});