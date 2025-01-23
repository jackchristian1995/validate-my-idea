import { createClient } from "@supabase/supabase-js";

const { supabaseProjectUrl, supabaseApiKey } = useRuntimeConfig();

const supabase = createClient(supabaseProjectUrl, supabaseApiKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  }
});

export default supabase;