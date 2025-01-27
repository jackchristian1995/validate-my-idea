import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' });

  const { data: { user }, error } = await supabase.auth.getUser(authToken);
  if (error) throw createError({ statusCode: 401, statusMessage: error.message });

  return user;
});