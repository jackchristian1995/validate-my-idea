import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  
  const { data: { session, user }, error: authError } = await supabase.auth.signInAnonymously({ options: { captchaToken: token } });
  if (authError) throw createError({ statusCode: 400, statusMessage: authError.message });
  // Give anon users free credit for first round of feedback
  // Add 'was_anon' and 'logged_in' to help track when they convert to OAuth accounts and add extra free credit
  const { data, error: updateError } = await supabase.auth.updateUser({ data: { credits: 1, was_anon: true, logged_in: false } });
  if (updateError) throw createError({ statusCode: 400, statusMessage: updateError.message });

  setCookie(event, 'auth_token', session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: session.expires_in,
    path: '/',
  });

  setCookie(event, 'refresh_token', session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  return user;
});