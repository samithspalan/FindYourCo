import { supabase } from '../lib/supabaseClient';

export async function getLoggedInUserProfile() {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) return null;
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth_user_id', userData.user.id)
      .single();
    if (error) return null;
    return profile;
  } catch (err) {
    return null;
  }
}

export function isEmployee(profile) {
  return profile?.role === 'employee';
}

export function isFounder(profile) {
  return profile?.role === 'founder';
}
