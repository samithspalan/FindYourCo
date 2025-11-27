import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upsertEmployeeProfile, upsertEmployeeSkills } from "../../../database/complete-profile/completeProfile";
import { useSupabaseUser } from "../../../hooks/useSupabaseUser";
import { Button } from "../../../components/ui/Button";
import { employeeStep1Data, employeeStep2Data } from "../../../demo/employeeDemoData";
import { User, Briefcase, FileText, Target, Linkedin, Github, Globe, MapPin, Layers } from "lucide-react";

function EmployeeOnboarding() {
  const { profile } = useSupabaseUser();
  const [step, setStep] = useState(1);
  const [employeeData, setEmployeeData] = useState({
    full_name: "",
    profile_photo: "",
    short_bio: "",
    current_position: "",
    career_goal: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    city: "",
    country: "",
  });
  const [skillsData, setSkillsData] = useState({
    skill_tags: [],
    expertise_summary: "",
    years_of_experience: "",
    tech_stack: [],
    open_to_roles: [],
    availability: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Demo input for step 1
  const handleDemoInputStep1 = () => {
    const random = employeeStep1Data[Math.floor(Math.random() * employeeStep1Data.length)];
    setEmployeeData(random);
  };

  // Demo input for step 2
  const handleDemoInputStep2 = () => {
    const random = employeeStep2Data[Math.floor(Math.random() * employeeStep2Data.length)];
    setSkillsData(random);
  };

  // Step 1: Employee Profile
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await upsertEmployeeProfile(profile.id, employeeData);
      setEmployeeData({ ...employeeData, id: result.id }); // Save employee_profile id for next step
      setStep(2);
    } catch (err) {
      setError("Failed to save employee profile.");
    }
    setLoading(false);
  };

  // Step 2: Skills
  const handleSkillsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await upsertEmployeeSkills(employeeData.id, skillsData);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save skills.");
    }
    setLoading(false);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900">
      <div className="w-full max-w-xl mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-8 h-8 text-blue-700" />
          <h2 className="text-2xl font-bold text-blue-900">
            Employee Onboarding
          </h2>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-blue-600" : "bg-blue-200"} mx-1`} />
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-blue-600" : "bg-blue-200"} mx-1`} />
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {step === 1 && (
          <form onSubmit={handleEmployeeSubmit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Full Name"
                  value={employeeData.full_name}
                  onChange={e => setEmployeeData({ ...employeeData, full_name: e.target.value })}
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
                  value={employeeData.profile_photo}
                  onChange={e => setEmployeeData({ ...employeeData, profile_photo: e.target.value })}
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
                value={employeeData.short_bio}
                onChange={e => setEmployeeData({ ...employeeData, short_bio: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Briefcase className="w-4 h-4" /> Current Position
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Current Position"
                  value={employeeData.current_position}
                  onChange={e => setEmployeeData({ ...employeeData, current_position: e.target.value })}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Target className="w-4 h-4" /> Career Goal
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Career Goal"
                  value={employeeData.career_goal}
                  onChange={e => setEmployeeData({ ...employeeData, career_goal: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Linkedin className="w-4 h-4" /> LinkedIn URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="LinkedIn URL"
                  value={employeeData.linkedin_url}
                  onChange={e => setEmployeeData({ ...employeeData, linkedin_url: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Github className="w-4 h-4" /> GitHub URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="GitHub URL"
                  value={employeeData.github_url}
                  onChange={e => setEmployeeData({ ...employeeData, github_url: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Globe className="w-4 h-4" /> Portfolio URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Portfolio URL"
                value={employeeData.portfolio_url}
                onChange={e => setEmployeeData({ ...employeeData, portfolio_url: e.target.value })}
              />
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
                  value={employeeData.city}
                  onChange={e => setEmployeeData({ ...employeeData, city: e.target.value })}
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
                  value={employeeData.country}
                  onChange={e => setEmployeeData({ ...employeeData, country: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Next: Skills"}
              </Button>
              <Button type="button" onClick={handleDemoInputStep1} variant="secondary">
                Demo Input
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSkillsSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Layers className="w-4 h-4" /> Skill Tags <span className="text-xs text-blue-500">(comma separated)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Skill Tags (comma separated)"
                value={skillsData.skill_tags.join(",")}
                onChange={e => setSkillsData({ ...skillsData, skill_tags: e.target.value.split(",") })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4" /> Expertise Summary
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Expertise Summary"
                value={skillsData.expertise_summary}
                onChange={e => setSkillsData({ ...skillsData, expertise_summary: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Briefcase className="w-4 h-4" /> Years of Experience
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Years of Experience"
                  value={skillsData.years_of_experience}
                  onChange={e => setSkillsData({ ...skillsData, years_of_experience: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Layers className="w-4 h-4" /> Tech Stack <span className="text-xs text-blue-500">(comma separated)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                  placeholder="Tech Stack (comma separated)"
                  value={skillsData.tech_stack.join(",")}
                  onChange={e => setSkillsData({ ...skillsData, tech_stack: e.target.value.split(",") })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Target className="w-4 h-4" /> Open to Roles <span className="text-xs text-blue-500">(comma separated)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Open to Roles (comma separated)"
                value={skillsData.open_to_roles.join(",")}
                onChange={e => setSkillsData({ ...skillsData, open_to_roles: e.target.value.split(",") })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-1">
                <Globe className="w-4 h-4" /> Availability
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                placeholder="Availability"
                value={skillsData.availability}
                onChange={e => setSkillsData({ ...skillsData, availability: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Finish & Go to Dashboard"}
              </Button>
              <Button type="button" onClick={handleDemoInputStep2} variant="secondary">
                Demo Input
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EmployeeOnboarding;
