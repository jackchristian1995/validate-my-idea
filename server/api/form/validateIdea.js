export default defineEventHandler(async (event) => {
  const { product, problem, market } = await readBody(event);

  if (product.length > 500 || problem.length > 500 || market.length > 500) throw createError({ statusCode: 400, statusMessage: 'Ensure all text inputs contain less than 500 characters.' });

  if (product.length < 30 || problem.length < 30 || market.length < 30) throw createError({ statusCode: 400, statusMessage: 'We need more information. Write as much as you can.'});

  return true;
});