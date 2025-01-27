import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { id, feedback: { product, problem, market } } = await readBody(event);
  const authToken = getCookie(event, 'auth_token');
  
  const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
  if (authError) throw createError({ statusCode: 401, statusMessage: authError.message });

  const { data, error: dbError } = await supabase.from('feedback').upsert({
    id,
    user_id: user.id,
    product,
    problem,
    market
  }, { onConflict: 'id' }).select();
  if (dbError) throw createError({ statusCode: 400, statusMessage: dbError.message });

  return data[0];
});