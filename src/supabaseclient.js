import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SVELTE_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.SVELTE_APP_SUPABASE_ANON_KEY;
// console.log(process.env.SVELTE_APP_SUPABASE_URL);

// console.log(
//   "broooooooooooooooooo",
//   import.meta.env.VITE_SVELTE_APP_SUPABASE_URL
// );

export const supabase = createClient(
  import.meta.env.VITE_SVELTE_APP_SUPABASE_URL,
  import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY
);
