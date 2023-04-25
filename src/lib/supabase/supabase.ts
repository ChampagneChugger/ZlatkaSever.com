import { createClient } from "@supabase/supabase-js"

const supabase = createClient("https://hhesboxchergnesswrud.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZXNib3hjaGVyZ25lc3N3cnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjA2ODQsImV4cCI6MTk5MjczNjY4NH0.PoVMmDdWTz5C2RVE7x4lorgAQUAe6v3QqvSvi0sJz1Q")

export { supabase }