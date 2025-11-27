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
  console.log('signIn response:', { data, error });
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
export async function getPostsWithUserDetails() {
  // 1. Fetch posts (user_id references auth.users)
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !posts) return { data: null, error };

  // 2. Get unique user_ids
  const userIds = [...new Set(posts.map(post => post.user_id).filter(Boolean))];
  if (userIds.length === 0) return { data: posts, error: null };

  // 3. Fetch profiles for those user_ids (join on auth_user_id)
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, auth_user_id, role')
    .in('auth_user_id', userIds);

  if (profileError) return { data: null, error: profileError };

  // 4. Map profiles by auth_user_id
  const profileMap = {};
  profiles.forEach(profile => {
    profileMap[profile.auth_user_id] = profile;
  });

  // 5. Separate profile IDs by role
  const employeeProfileIds = profiles.filter(p => p.role === 'employee').map(p => p.id);
  const founderProfileIds = profiles.filter(p => p.role === 'founder').map(p => p.id);

  // 6. Fetch employee_profile and founder_profile in parallel
  const [employeeProfilesRes, founderProfilesRes] = await Promise.all([
    supabase.from('employee_profile').select('*').in('profile_id', employeeProfileIds),
    supabase.from('founder_profile').select('*').in('profile_id', founderProfileIds),
  ]);

  const employeeProfiles = employeeProfilesRes.data || [];
  const founderProfiles = founderProfilesRes.data || [];

  // 7. Map detailed profiles by profile_id
  const employeeProfileMap = {};
  employeeProfiles.forEach(ep => { employeeProfileMap[ep.profile_id] = ep; });
  const founderProfileMap = {};
  founderProfiles.forEach(fp => { founderProfileMap[fp.profile_id] = fp; });

  // 8. Attach all info to posts
  const postsWithUserDetails = posts.map(post => {
    const profile = profileMap[post.user_id];
    let userDetails = null;
    if (profile) {
      if (profile.role === 'employee') {
        userDetails = employeeProfileMap[profile.id] || null;
      } else if (profile.role === 'founder') {
        userDetails = founderProfileMap[profile.id] || null;
      }
    }
    return {
      ...post,
      profile,
      userDetails, // This will be either employee_profile or founder_profile
      role: profile?.role || null,
    };
  });

  return { data: postsWithUserDetails, error: null };
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
