export const appConfig = {
  name: 'Burger Fest',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
};

