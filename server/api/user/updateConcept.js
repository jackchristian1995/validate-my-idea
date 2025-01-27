import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { id, concept: { product, problem, market } } = await readBody(event);

  const { data, error: dbError } = await supabase.from('concepts').update({
    product,
    problem,
    market
  }).eq('id', id);
  if (dbError) throw createError({ statusCode: 400, statusMessage: dbError.message });

  return data;
});