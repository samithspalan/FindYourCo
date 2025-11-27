import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Fetches the authenticated user and their profile row from Supabase
export function useSupabaseUser() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchUserAndProfile() {
      setLoading(true);
      setError(null);
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!userData?.user) {
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }
        if (isMounted) setUser(userData.user);
        // Fetch profile row
        const { data: profileRows, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_user_id", userData.user.id)
          .maybeSingle();
        if (profileError) throw profileError;
        if (isMounted) setProfile(profileRows);
      } catch (err) {
        if (isMounted) setError(err.message || "Error fetching user/profile");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchUserAndProfile();
    return () => { isMounted = false; };
  }, []);

  return { user, profile, loading, error };
}
