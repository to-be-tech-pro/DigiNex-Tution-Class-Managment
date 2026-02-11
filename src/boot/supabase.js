import { createClient } from '@supabase/supabase-js'
import { boot } from 'quasar/wrappers'

// Hardcoded for immediate stability - revert to .env later if needed
const supabaseUrl = 'https://ticmdqeyeiycznfzxqrx.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTMzNzYsImV4cCI6MjA4NTk2OTM3Nn0.rDnmzU407z9BmIFhvFlQghXmthoYKHvlrBVyrd33i0I'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase Init:', { url: supabaseUrl, keyPresent: !!supabaseAnonKey })

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default boot(({ app }) => {
  app.config.globalProperties.$supabase = supabase
  // You can also use inject in composition API:
  // app.provide('supabase', supabase)
})

export { supabase }
