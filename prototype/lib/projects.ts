export type ProjectStatus =
  | "Open for Investment"
  | "Almost Fully Allocated"
  | "Waitlist Open"
  | "Coming Soon";

export type Project = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: ProjectStatus;
  totalValue: string;
  targetRaise: string;
  fundedPercent: number;
  minimumInvestment: string;
  duration: string;
  targetReturn: string;
  risk: "Low" | "Moderate" | "Elevated";
  sponsorInvestment: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
};

export const projects: Project[] = [
  {
    id: "dubai-logistics",
    name: "Dubai Logistics Company",
    type: "Logistics",
    location: "Dubai, UAE",
    status: "Open for Investment",
    totalValue: "AED 48m",
    targetRaise: "AED 16m",
    fundedPercent: 64,
    minimumInvestment: "AED 50,000",
    duration: "4 years",
    targetReturn: "12-15%",
    risk: "Moderate",
    sponsorInvestment: "AED 18m",
    summary: "Expansion of an operating logistics business and its tracked commercial fleet.",
    metricLabel: "Fleet utilisation",
    metricValue: "87%",
  },
  {
    id: "residential-development",
    name: "Residential Development",
    type: "Residential",
    location: "Dubai, UAE",
    status: "Almost Fully Allocated",
    totalValue: "AED 210m",
    targetRaise: "AED 55m",
    fundedPercent: 91,
    minimumInvestment: "AED 100,000",
    duration: "3 years",
    targetReturn: "14-18%",
    risk: "Moderate",
    sponsorInvestment: "AED 70m",
    summary: "A residential development with live construction progress and verified project reporting.",
    metricLabel: "Pre-sales",
    metricValue: "42%",
  },
  {
    id: "hospital-development",
    name: "Hospital Development",
    type: "Healthcare",
    location: "UAE",
    status: "Waitlist Open",
    totalValue: "AED 320m",
    targetRaise: "AED 80m",
    fundedPercent: 100,
    minimumInvestment: "AED 150,000",
    duration: "7 years",
    targetReturn: "11-14%",
    risk: "Elevated",
    sponsorInvestment: "AED 95m",
    summary: "Construction, commissioning and long-term operation of a healthcare facility.",
    metricLabel: "Design completion",
    metricValue: "76%",
  },
  {
    id: "data-center",
    name: "Data Center",
    type: "Digital Infrastructure",
    location: "Dubai, UAE",
    status: "Coming Soon",
    totalValue: "AED 450m",
    targetRaise: "AED 120m",
    fundedPercent: 0,
    minimumInvestment: "AED 250,000",
    duration: "6 years",
    targetReturn: "13-17%",
    risk: "Moderate",
    sponsorInvestment: "AED 140m",
    summary: "Development and operation of a scalable data-center asset with live infrastructure milestones.",
    metricLabel: "Planned capacity",
    metricValue: "12 MW",
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
