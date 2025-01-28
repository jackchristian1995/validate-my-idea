import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  const { data: { user: { user_metadata: { credits } } }, error: creditsError } =  await supabase.auth.getUser(authToken);
  if (creditsError) throw createError({ statusMessage: creditsError.message });
  const newBalance = credits - 1;
  const { data: { user }, error: updateError } = await supabase.auth.updateUser({ data: { credits: newBalance } });
  if (updateError) throw createError({ statusMessage: updateError.message });

  return user;
});