import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// google: https://console.cloud.google.com/apis/credentials?hl=ja&organizationId=0&project=chatgpt-clone-for-coloso-watch
