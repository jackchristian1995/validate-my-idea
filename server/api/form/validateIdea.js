export default defineEventHandler(async (event) => {
  const { description, problem, target, recaptchaToken } = await readBody(event);

  if (description.length > 500 || problem.length > 500 || target.length > 500) throw createError({ statusCode: 400, statusMessage: 'Ensure all text inputs contain less than 500 characters.' });

  if (description.length < 30 || problem.length < 30 || target.length < 30) throw createError({ statusCode: 400, statusMessage: 'We need more information. Write as much as you can.'});

  const { recaptchaSecretKey } = useRuntimeConfig();
  const recaptchaRes = await $fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: {
      secret: recaptchaSecretKey,
      response: recaptchaToken,
    },
  });

  if (!recaptchaRes || recaptchaRes.score < 0.5) throw createError({ statusCode: 400, statusMessage: 'recaptcha Failed' });

  return true;
});