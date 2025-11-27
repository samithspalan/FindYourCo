import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upsertFounderProfile, upsertStartupProfile } from "../../../database/complete-profile/completeProfile";
import { useSupabaseUser } from "../../../hooks/useSupabaseUser";
import { Button } from "../../../components/ui/Button";
import { User, Building2, Globe, Linkedin, MapPin, Users, Layers, Rocket, Target, FileText } from "lucide-react";
import { founderStep1Data, founderStep2Data } from "../../../demo/founderDemoData";

function FounderOnboarding() {
  const { profile } = useSupabaseUser();
  const [step, setStep] = useState(1);
  const [founderData, setFounderData] = useState({
    full_name: "",
    profile_photo: "",
    short_bio: "",
    experience_background: "",
    linkedin_url: "",
    city: "",
    country: "",
    looking_for: "",
  });
  const [startupData, setStartupData] = useState({
    startup_name: "",
    one_line_pitch: "",
    description: "",
    industry: "",
    stage: "",
    tech_stack: [],
    website_url: "",
    problem_statement: "",
    target_market: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: Founder Profile
  const handleFounderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await upsertFounderProfile(profile.id, founderData);
      setFounderData({ ...founderData, id: result.id }); // Save founder_profile id for next step
      setStep(2);
    } catch (err) {
      setError("Failed to save founder profile.");
    }
    setLoading(false);
  };

  // Step 2: Startup Profile
  const handleStartupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await upsertStartupProfile(founderData.id, startupData);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save startup profile.");
    }
    setLoading(false);
  };

  const handleDemoInputStep1 = () => {
    const random = founderStep1Data[Math.floor(Math.random() * founderStep1Data.length)];
    setFounderData(random);
  };

  const handleDemoInputStep2 = () => {
    const random = founderStep2Data[Math.floor(Math.random() * founderStep2Data.length)];
    setStartupData(random);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900">
      <div className="w-full max-w-xl mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-8 h-8 text-blue-700" />
          <h2 className="text-2xl font-bold text-blue-900">
            Founder Onboarding
          </h2>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-blue-600" : "bg-blue-200"} mx-1`} />
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-blue-600" : "bg-blue-200"} mx-1`} />
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {step === 1 && (
          <form onSubmit={handleFounderSubmit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Full Name"
                  value={founderData.full_name}
                  onChange={e => setFounderData({ ...founderData, full_name: e.target.value })}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Globe className="w-4 h-4" /> Profile Photo URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Profile Photo URL"
                  value={founderData.profile_photo}
                  onChange={e => setFounderData({ ...founderData, profile_photo: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4" /> Short Bio
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Short Bio"
                value={founderData.short_bio}
                onChange={e => setFounderData({ ...founderData, short_bio: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Layers className="w-4 h-4" /> Experience Background
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Experience Background"
                  value={founderData.experience_background}
                  onChange={e => setFounderData({ ...founderData, experience_background: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Linkedin className="w-4 h-4" /> LinkedIn URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="LinkedIn URL"
                  value={founderData.linkedin_url}
                  onChange={e => setFounderData({ ...founderData, linkedin_url: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> City
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="City"
                  value={founderData.city}
                  onChange={e => setFounderData({ ...founderData, city: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Globe className="w-4 h-4" /> Country
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Country"
                  value={founderData.country}
                  onChange={e => setFounderData({ ...founderData, country: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Users className="w-4 h-4" /> Looking For <span className="text-xs text-blue-500">(e.g. CTO, Designer)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Looking For (e.g. CTO, Designer)"
                value={founderData.looking_for}
                onChange={e => setFounderData({ ...founderData, looking_for: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="mt-2 flex-1">
                {loading ? "Saving..." : "Next: Startup Details"}
              </Button>
              <Button type="button" onClick={handleDemoInputStep1} className="mt-2 flex-1 bg-blue-100 text-blue-900 hover:bg-blue-200">
                Demo Input
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleStartupSubmit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Building2 className="w-4 h-4" /> Startup Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Startup Name"
                  value={startupData.startup_name}
                  onChange={e => setStartupData({ ...startupData, startup_name: e.target.value })}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Target className="w-4 h-4" /> One Line Pitch
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="One Line Pitch"
                  value={startupData.one_line_pitch}
                  onChange={e => setStartupData({ ...startupData, one_line_pitch: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4" /> Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Description"
                value={startupData.description}
                onChange={e => setStartupData({ ...startupData, description: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Layers className="w-4 h-4" /> Industry
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Industry"
                  value={startupData.industry}
                  onChange={e => setStartupData({ ...startupData, industry: e.target.value })}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Rocket className="w-4 h-4" /> Stage
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Stage"
                  value={startupData.stage}
                  onChange={e => setStartupData({ ...startupData, stage: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Layers className="w-4 h-4" /> Tech Stack <span className="text-xs text-blue-500">(comma separated)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Tech Stack (comma separated)"
                value={startupData.tech_stack.join(",")}
                onChange={e => setStartupData({ ...startupData, tech_stack: e.target.value.split(",") })}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Globe className="w-4 h-4" /> Website URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Website URL"
                  value={startupData.website_url}
                  onChange={e => setStartupData({ ...startupData, website_url: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Target className="w-4 h-4" /> Problem Statement
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Problem Statement"
                  value={startupData.problem_statement}
                  onChange={e => setStartupData({ ...startupData, problem_statement: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Users className="w-4 h-4" /> Target Market
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Target Market"
                value={startupData.target_market}
                onChange={e => setStartupData({ ...startupData, target_market: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="mt-2 flex-1">
                {loading ? "Saving..." : "Finish & Go to Dashboard"}
              </Button>
              <Button type="button" onClick={handleDemoInputStep2} className="mt-2 flex-1 bg-blue-100 text-blue-900 hover:bg-blue-200">
                Demo Input
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default FounderOnboarding;
