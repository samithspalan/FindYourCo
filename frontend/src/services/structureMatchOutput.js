export default function structureMatchOutput(aiResult, details) {
  // Employee card
  if (aiResult.employeeId && details?.profile) {
    const p = details.profile;
    const s = details.skills || {};
    return {
      id: aiResult.employeeId,
      name: p.full_name,
      role: aiResult.recommendedRole || p.current_position || 'employee',
      matchPercentage: aiResult.fitPercentage,
      bio: p.short_bio,
      skills: s.skill_tags || [],
      location: [p.city, p.country].filter(Boolean).join(', '),
      education: p.education || '',
      previousCompanies: s.previous_companies || [],
      interests: s.open_to_roles || [],
      reasoning: aiResult.reasoning,
      verified: true,
      avatar: p.full_name
        ? p.full_name.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2)
        : '??'
    };
  }
  // Startup card
  if (aiResult.startupId && details?.startup) {
    const s = details.startup;
    const f = details.founder || {};
    return {
      id: aiResult.startupId,
      name: s.startup_name,
      role: aiResult.suggestedRole || 'founder',
      matchPercentage: aiResult.fitPercentage,
      bio: s.one_line_pitch || s.description || '',
      skills: s.tech_stack || [],
      location: [f.city, f.country].filter(Boolean).join(', '),
      education: f.experience_background || '',
      previousCompanies: [],
      interests: s.industry ? [s.industry] : [],
      reasoning: aiResult.reasoning,
      verified: true,
      avatar: s.startup_name
        ? s.startup_name.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2)
        : '??'
    };
  }
  // Fallback
  return {
    id: aiResult.employeeId || aiResult.startupId || '',
    name: '',
    role: '',
    matchPercentage: aiResult.fitPercentage || 0,
    bio: '',
    skills: [],
    location: '',
    education: '',
    previousCompanies: [],
    interests: [],
    reasoning: aiResult.reasoning || '',
    verified: false,
    avatar: '??'
  };
}
