import supabase from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  const { data, error } = await supabase.from('concepts').select().eq('id', id);
  if (error) throw createError({ statusMessage: error.message });

  return data[0];
});