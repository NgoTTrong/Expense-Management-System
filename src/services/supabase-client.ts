import { createClient } from "@supabase/supabase-js";

// Production
const supabaseUrl = "https://huzlqntwwlgiunapilag.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1emxxbnR3d2xnaXVuYXBpbGFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDk0NTk0NCwiZXhwIjoyMDIwNTIxOTQ0fQ.8BAHgwVSXtzbJ45Wlmg1LZoUPtVHSx8dluJXfYySgk0";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
