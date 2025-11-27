import React from "react";
import { useParams } from "react-router-dom";
import FounderOnboarding from "./Founder/FounderOnboarding";
import EmployeeOnboarding from "./Employee/EmployeeOnboarding";

function Onboarding() {
  const { role } = useParams();

  if (role === "founder") return <FounderOnboarding />;
  if (role === "employee") return <EmployeeOnboarding />;
  return <div>Invalid role.</div>;
}

export default Onboarding;
