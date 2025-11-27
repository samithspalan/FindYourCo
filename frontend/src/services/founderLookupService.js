import { supabase } from '../lib/supabaseClient';

export async function getFounderProfileById(founderId) {
  try {
    const { data, error } = await supabase
      .from('founder_profile')
      .select('*')
      .eq('id', founderId)
      .single();
    if (error) return null;
    return data;
  } catch (err) {
    return null;
  }
}

export async function getStartupProfileByFounderId(founderId) {
  try {
    const { data, error } = await supabase
      .from('startup_profile')
      .select('*')
      .eq('founder_profile_id', founderId)
      .single();
    if (error) return null;
    return data;
  } catch (err) {
    return null;
  }
}

export async function getFullStartupDetails(startupId) {
  try {
    const { data: startup, error } = await supabase
      .from('startup_profile')
      .select('*')
      .eq('id', startupId)
      .single();
    if (error || !startup) return { startup: null, founder: null };
    const founder = await getFounderProfileById(startup.founder_profile_id);
    return { startup, founder };
  } catch (err) {
    return { startup: null, founder: null };
  }
}
