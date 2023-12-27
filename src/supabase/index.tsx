import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_API_KEY!
);
