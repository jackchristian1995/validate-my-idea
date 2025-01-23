export default defineEventHandler(async (event) => {
  const { description, problem, target } = await readBody(event);

  if (description.length > 300 || problem.length > 300 || target.length > 300) throw createError({ statusCode: 400, statusMessage: 'Ensure all text inputs contain less than 300 characters.' });

  if (description.length < 30 || problem.length < 30 || target.length < 30) throw createError({ statusCode: 400, statusMessage: 'We need more information. Write as much as you can.'});

  return true;
});