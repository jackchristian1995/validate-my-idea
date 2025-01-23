import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');
  
  if (!refreshToken) throw createError({ statusCode: 401, statusMessage: 'User not logged in - no refresh token available' });

  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (error) throw createError({ statusCode: error.code, statusMessage: error.statusMessage });
  
  setCookie(event, 'auth_token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: data.expires_in,
    path: '/',
  });

  setCookie(event, 'refresh_token', data.session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return true;
})