import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (typeof window === "undefined") {
  console.log("Supabase URL present:", !!supabaseUrl);
  console.log("Supabase Key present:", !!supabaseAnonKey);
}

if (!supabaseUrl || !supabaseAnonKey) {
  const msg = "CRITICAL: Supabase URL or Anon Key is missing! Check your .env file and RESTART your dev server.";
  console.error(msg);
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
