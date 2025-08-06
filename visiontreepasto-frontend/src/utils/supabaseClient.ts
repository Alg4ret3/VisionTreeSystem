// Importo la función para crear un cliente de Supabase
import { createClient } from "@supabase/supabase-js";

// Creo una instancia de Supabase usando las variables de entorno públicas
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

