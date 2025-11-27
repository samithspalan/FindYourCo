import { supabase } from '../lib/supabaseClient';

export async function getEmployeeProfileById(employeeId) {
  try {
    const { data, error } = await supabase
      .from('employee_profile')
      .select('*')
      .eq('id', employeeId)
      .single();
    if (error) return null;
    return data;
  } catch (err) {
    return null;
  }
}

export async function getEmployeeSkillsById(employeeId) {
  try {
    const { data, error } = await supabase
      .from('employee_skills')
      .select('*')
      .eq('employee_profile_id', employeeId)
      .single();
    if (error) return null;
    return data;
  } catch (err) {
    return null;
  }
}

export async function getFullEmployeeDetails(employeeId) {
  const profile = await getEmployeeProfileById(employeeId);
  const skills = await getEmployeeSkillsById(employeeId);
  return { profile, skills };
}
