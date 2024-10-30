import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://llvkobvznbnbffuajrla.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdmtvYnZ6bmJuYmZmdWFqcmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4ODQ2NDMsImV4cCI6MjA0MDQ2MDY0M30.TTXuBVduH8hZ37-Pov9uDZ5vWbVp_CP_rdxDFpVQwLQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
