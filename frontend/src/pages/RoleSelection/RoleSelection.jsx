import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/Button";
import { Briefcase, Users } from "lucide-react";

function RoleSelection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    setLoading(true);
    setError("");
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const user = userData.user;
      // Insert into profiles table
      const { data, error: insertError } = await supabase
        .from("profiles")
        .insert([{ auth_user_id: user.id, role }])
        .select()
        .single();

      if (insertError) throw insertError;

      // Redirect to onboarding
      navigate(`/onboarding/${role}`);
    } catch (err) {
      setError("Could not set role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900">
      <div className="w-full max-w-md mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Welcome! Select your role</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="flex flex-col gap-6">
          <button
            disabled={loading}
            onClick={() => handleRoleSelect("founder")}
            className="flex items-center gap-4 px-6 py-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-500/10 to-purple-400/10 hover:from-blue-500/20 hover:to-purple-400/20 transition-all shadow group focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Users className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-blue-900 group-hover:text-purple-800">I am a Founder</span>
              <span className="text-sm text-blue-700 group-hover:text-purple-700">Build your team and startup</span>
            </div>
          </button>
          <button
            disabled={loading}
            onClick={() => handleRoleSelect("employee")}
            className="flex items-center gap-4 px-6 py-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-500/10 to-purple-400/10 hover:from-blue-500/20 hover:to-purple-400/20 transition-all shadow group focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Briefcase className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-blue-900 group-hover:text-purple-800">I am an Employee</span>
              <span className="text-sm text-blue-700 group-hover:text-purple-700">Find your next opportunity</span>
            </div>
          </button>
        </div>
        {loading && (
          <div className="mt-6 text-center text-blue-700 animate-pulse">Saving your choice...</div>
        )}
      </div>
    </div>
  );
}

export default RoleSelection;
