export interface AboutValue {
  id: string;
  title: string;
  description: string;
  iconName: "shield" | "users" | "scale" | "heart";
}

export interface AboutApproachStep {
  step: string;
  title: string;
  description: string;
}

export interface AboutFootprintLocation {
  division: string;
  hub: string;
  focus: string;
}

export interface AboutComplianceItem {
  id: string;
  standard: string;
  detail: string;
}

export interface StaffCapacity {
  id: string;
  title: string;
  icon: string;
}

