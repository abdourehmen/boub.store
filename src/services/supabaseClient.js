import { createClient } from '@supabase/supabase-js'

// استبدل هذه القيم ببيانات مشروعك الفعلي من لوحة تحكم Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)