import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Verifica si las credenciales de Supabase están correctamente configuradas y no son los valores por defecto
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('tu-proyecto') &&
    !supabaseAnonKey.includes('tu-anon-key')
  );
};

export const getSupabaseConfig = () => {
  return {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  };
};

/**
 * Cliente singleton de Supabase.
 * Retorna null si las variables de entorno aún no han sido configuradas por el usuario.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

