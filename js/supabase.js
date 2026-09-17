import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdmcksauudjnlshrgkdw.supabase.co';
const supabaseKey = 'sb_publishable_FAWQj0RCUVA51fBOyBd6CQ_7Ap4gDiU';

export const supabase = createClient(supabaseUrl, supabaseKey);