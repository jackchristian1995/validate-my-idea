import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');
  const { data: { session, user }, error: refreshError } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (refreshError) throw createError({ statusCode: error.code, statusMessage: refreshError.statusMessage });
  
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

  const { data, error: linkError } = await supabase.auth.linkIdentity({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/login/callback'
    }
  });

  if (linkError) throw createError({ statusCode: 401, statusMessage: linkError.message });

  return data.url;
});