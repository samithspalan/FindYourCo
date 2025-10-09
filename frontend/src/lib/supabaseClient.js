import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign up a user using Supabase Auth (email + password)
export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

// Sign in a user using Supabase Auth (email + password)
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// Sign in user using Google OAuth
export async function signInWithGoogle() {
  const { data , error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options :{
      redirectTo : window.location.origin,
    },
  });

  return { data , error}
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get current user session
export function getUser() {
  return supabase.auth.getUser();
}

// Optional: keep insertUser if you want to store profile data in a table after sign-up
export async function UpsertUser(profile) {
  const { data, error } = await supabase.from('users').insert([profile],{
     onConflict: ['id'],
  });
  return { data, error };
}

// Get all posts (ordered by creation date, newest first)
export async function getPosts() {
  console.log('getPosts function called');
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:users!posts_user_id_fkey (
          id,
          full_name,
          email,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    console.log('Supabase response:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('Exception in getPosts:', err);
    return { data: null, error: err };
  }
}



// Test function to check Supabase connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('posts').select('count', { count: 'exact' });
    console.log('Connection test result:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('Connection test error:', err);
    return { data: null, error: err };
  }
}
