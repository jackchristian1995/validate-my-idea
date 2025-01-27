import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const authToken = await getCookie(event, 'auth_token');

  const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
  if (authError) throw createError({ statusCode: 401, statusMessage: authError.message });

  const { data, error: dbError } = await supabase.from('concepts').select().eq('user_id', user.id);
  if (dbError) throw createError({ statusMessage: dbError.message });

  return data;
});