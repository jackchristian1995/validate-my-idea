import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { error } = await supabase.auth.signOut();
  if (error) throw createError({ statusCode: 500, statusMessage: error.message });

  deleteCookie('auth_token');
  deleteCookie('refresh_token');

  return true;
});