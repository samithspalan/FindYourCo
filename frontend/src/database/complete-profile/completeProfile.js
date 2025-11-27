import { supabase } from "../../lib/supabaseClient";

/**
 * Create or update founder profile
 */
export async function upsertFounderProfile(profile_id, data) {
  // data: { full_name, profile_photo, ... }
  console.log("Upserting founder profile:", profile_id, data);
  const { data: result, error } = await supabase
    .from("founder_profile")
    .upsert([{ profile_id, ...data }])
    .select()
    .single();

    console.log("Upsert result:", result, error);
  if (error) throw error;
  return result;
}

/**
 * Create or update startup profile
 */
export async function upsertStartupProfile(founder_profile_id, data) {
  const { data: result, error } = await supabase
    .from("startup_profile")
    .upsert([{ founder_profile_id, ...data }])
    .select()
    .single();
  if (error) throw error;
  return result;
}

/**
 * Create or update employee profile
 */
export async function upsertEmployeeProfile(profile_id, data) {
  const { data: result, error } = await supabase
    .from("employee_profile")
    .upsert([{ profile_id, ...data }])
    .select()
    .single();
  if (error) throw error;
  return result;
}

/**
 * Create or update employee skills
 */
export async function upsertEmployeeSkills(employee_profile_id, data) {
  const { data: result, error } = await supabase
    .from("employee_skills")
    .upsert([{ employee_profile_id, ...data }])
    .select()
    .single();
  if (error) throw error;
  return result;
}
