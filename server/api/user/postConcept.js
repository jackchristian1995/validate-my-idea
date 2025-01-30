import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { concept: { product, problem, market, name } } = await readBody(event);
  const authToken = getCookie(event, 'auth_token');
  
  const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
  if (authError) throw createError({ statusCode: 401, statusMessage: authError.message });

  const { data, error: dbError } = await supabase.from('concepts').upsert({
    user_id: user.id,
    name,
    product,
    problem,
    market
  }, { onConflict: 'id' }).select();
  if (dbError) throw createError({ statusCode: 400, statusMessage: dbError.message });

  return data;
});