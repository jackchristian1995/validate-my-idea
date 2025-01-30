import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { id, concept: { product, problem, market } } = await readBody(event);
  const authToken = getCookie(event, 'auth_token');

  const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
  if (authError) throw createError({ statusCode: 400, statusMessage: authError.message });

  const { data, error: dbError } = await supabase.from('concepts').update({
    product,
    problem,
    market
  }).eq('id', id).eq('user_id', user.id).select();

  if (dbError) throw createError({ statusCode: 400, statusMessage: dbError.message });

  return data;
});