import { supabase } from '../lib/supabaseClient';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function findSimilarEmployeesForFounder() {
  try {
    // 1. Get logged-in user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error('User not authenticated');
    const user = userData.user;

    // 2. Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();
    if (profileError || !profile) throw new Error('Profile not found');
    if(profile.role !== 'founder') throw new Error('User is not a founder');

    // 3. Fetch founder_profile
    const { data: founder, error: founderError } = await supabase
      .from('founder_profile')
      .select('*')
      .eq('profile_id', profile.id)
      .single();

    // 4. Fetch startup_profile
    let startup = null;
    if (founder && founder.id) {
      const { data: startupData } = await supabase
        .from('startup_profile')
        .select('*')
        .eq('founder_profile_id', founder.id)
        .single();
      startup = startupData || null;
    }

    // 5. Fetch all employees and their skills
    const { data: employees, error: empError } = await supabase
      .from('employee_profile')
      .select('*');
    if (empError) throw new Error('Could not fetch employees');

    const { data: skills, error: skillsError } = await supabase
      .from('employee_skills')
      .select('*');
    if (skillsError) throw new Error('Could not fetch employee skills');

    const employeesWithSkills = employees.map(emp => {
      const skill = skills.find(s => s.employee_profile_id === emp.id) || {};
      return { ...emp, skills: skill };
    });

    const geminiInput = {
      founder: founder || {},
      startup: startup || {},
      employees: employeesWithSkills
    };

    console.log("Gemini Input:", geminiInput);

    // 6. Call Gemini LLM
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json", 
      } });

    const systemPrompt = `
SYSTEM INSTRUCTION:

You are an expert startup talent analyst. You analyze startup founders and match them with potential co-founders and employees.

TASK:
Return a JSON array. For each employee, evaluate:

- Match percentage (0-100)
- Best role fit (e.g., "CTO", "Frontend Engineer", "Marketing Lead", etc.)
- Reasoning behind the decision

Evaluation must be based on:
- Startup details
- Founder background
- Role needs
- Employee skills
- Employee goals

Return ONLY JSON in this format:

[
  {
    "employeeId": "<id>",
    "employeeName": "<name>",
    "fitPercentage": <number>,
    "recommendedRole": "<role>",
    "reasoning": "<reason>"
  }
]

If information is missing, return entry with:

fitPercentage: 0,
recommendedRole: "Unknown",
reasoning: "Insufficient data"
`;

    const prompt = `${systemPrompt}\n\nDATA:\n${JSON.stringify(geminiInput, null, 2)}`;

    let geminiResponse;
    try {
      const result = await model.generateContent(prompt);
      geminiResponse = result.response.text();
    } catch (err) {
      throw new Error('Gemini API error: ' + err.message);
    }

    let parsed;
    try {
      const jsonStart = geminiResponse.indexOf('[');
      const jsonEnd = geminiResponse.lastIndexOf(']');
      parsed = JSON.parse(geminiResponse.slice(jsonStart, jsonEnd + 1));
    } catch (err) {
      throw new Error('Failed to parse Gemini response: ' + geminiResponse);
    }

    parsed.sort((a, b) => b.fitPercentage - a.fitPercentage);
    
    
    console.log("Parsed Gemini Response:", parsed);
    return parsed;
  } catch (err) {
    console.error('Matching error:', err);
    return [];
  }
}

export async function findSimilarStartupsForEmployee() {
  try {
    // 1. Get logged-in user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error('User not authenticated');
    const user = userData.user;

    // 2. Fetch profile and check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();
    if (profileError || !profile) throw new Error('Profile not found');
    if (profile.role !== 'employee') throw new Error('User is not an employee');

    // 3. Fetch employee_profile
    const { data: employee, error: empError } = await supabase
      .from('employee_profile')
      .select('*')
      .eq('profile_id', profile.id)
      .single();
    if (empError || !employee) throw new Error('Employee profile not found');

    // 4. Fetch employee_skills
    const { data: skills, error: skillsError } = await supabase
      .from('employee_skills')
      .select('*')
      .eq('employee_profile_id', employee.id)
      .single();
    if (skillsError || !skills) throw new Error('Employee skills not found');

    // 5. Fetch all startup_profiles
    const { data: startups, error: startupsError } = await supabase
      .from('startup_profile')
      .select('*');
    if (startupsError) throw new Error('Could not fetch startups');

    // 6. Fetch all founder_profiles
    const { data: founders, error: foundersError } = await supabase
      .from('founder_profile')
      .select('*');
    if (foundersError) throw new Error('Could not fetch founders');

    // 7. Structure startups with founders
    const startupsWithFounders = startups.map(startup => {
      const founder = founders.find(f => f.id === startup.founder_profile_id) || {};
      return {
        startup,
        founder
      };
    });

    // 8. Structure data for Gemini
    const geminiInput = {
      employee: {
        profile: employee,
        skills: skills
      },
      startups: startupsWithFounders
    };

    console.log("Gemini Input:", geminiInput);


    // 9. Gemini system prompt
    const systemPrompt = `
SYSTEM INSTRUCTION:

You are an expert at analyzing startup roles and candidate alignment. Your job is to evaluate how well the employee would fit in each startup.

TASK:
Return a JSON array. For each startup, evaluate:

- Match percentage (0-100)
- Best suggested role for this employee in that startup
- Reasoning

Evaluation must be based on:
- The startup mission, stage, industry, and current team gaps
- Founder background
- Employee background, goals, and skills

Return ONLY JSON in THIS EXACT FORMAT:

[
  {
    "startupId": "<startup_profile_id>",
    "startupName": "<startup name>",
    "founderId": "<founder_profile_id>",
    "fitPercentage": <number>,
    "suggestedRole": "<role>",
    "reasoning": "<short explanation>"
  }
]

If insufficient data is available, return:

{
  "fitPercentage": 0,
  "suggestedRole": "Unknown",
  "reasoning": "Insufficient data provided."
}
`;

    const prompt = `${systemPrompt}\n\nDATA:\n${JSON.stringify(geminiInput, null, 2)}`;

    // 10. Call Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json", 
      } });

    let geminiResponse;
    try {
      const result = await model.generateContent(prompt);
      geminiResponse = result.response.text();
    } catch (err) {
      throw new Error('Gemini API error: ' + err.message);
    }

    // 11. Parse Gemini response
    let parsed;
    try {
      const jsonStart = geminiResponse.indexOf('[');
      const jsonEnd = geminiResponse.lastIndexOf(']');
      parsed = JSON.parse(geminiResponse.slice(jsonStart, jsonEnd + 1));
    } catch (err) {
      throw new Error('Failed to parse Gemini response: ' + geminiResponse);
    }

    // 12. Sort by fitPercentage descending
       console.log("Parsed Gemini Response:", parsed);
    return parsed.sort((a, b) => b.fitPercentage - a.fitPercentage);
  } catch (err) {
    console.error('Matching error:', err);
    return [];
  }
}
