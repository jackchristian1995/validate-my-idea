import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  
  const { data: { session, user }, error } = await supabase.auth.signInAnonymously({ options: { captchaToken: token } });
  if (error) throw createError({ statusCode: 400, statusMessage: error.message });
  

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