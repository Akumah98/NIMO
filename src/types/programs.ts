export interface ProgramActivity {
  title: string;
  description?: string;
  items: string[];
  image?: string;
}

export interface ProgramApproach {
  title: string;
  description: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  pillars?: string;
  subtitle: string;
  badge: string;
  overview: string;
  goal: string;
  objectives: string[];
  activities: ProgramActivity[];
  outcomes: string[];
  impacts?: string[];
  approaches: ProgramApproach[];
  commitment: string[];
  heroImage?: string;
  activityImages?: string[];
}
