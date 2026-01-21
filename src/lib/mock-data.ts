// =============================================================================
// Types aligned with Supabase schema
// =============================================================================

export type Location = "Munich" | "Paris" | "London" | "Berlin" | "Zurich";

export type Topic =
  | "AI"
  | "Robotics"
  | "Blockchain"
  | "Sustainability"
  | "Healthcare"
  | "Fintech"
  | "Education"
  | "Gaming"
  | "Cybersecurity"
  | "Music"
  | "Art"
  | "Cloud"
  | "Mobile"
  | "Web"
  | "AR"
  | "VR"
  | "Data Science"
  | "Hardware"
  | "IoT"
  | "Productivity"
  | "E-commerce"
  | "Transportation"
  | "Travel"
  | "Food Tech"
  | "Agriculture"
  | "Social Good"
  | "Developer Tools";

export type University = "TUM" | "LMU" | "HM";

export type Role = "user" | "admin" | "organizer";

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  linkedin_url: string | null;
  company: string | null;
  university: University | null;
  role: Role;
  elo: number;
  created_at: string;
}

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  location: Location;
  start_timestamp: string;
  end_timestamp: string;
  topics: Topic[];
}

export interface Team {
  id: string;
  name: string;
  hackathon_id: string;
  rank: number;
  members: Pick<Profile, "id" | "username" | "full_name" | "company" | "university">[];
}

export interface RankHistory {
  user: string;
  elo: number;
  created_at: string;
}

export interface HackathonParticipation {
  hackathon_id: string;
  hackathon_name: string;
  team_name: string;
  rank: number;
  date: string;
}

// =============================================================================
// Enum values for filters
// =============================================================================

export const locations: Location[] = ["Munich", "Paris", "London", "Berlin", "Zurich"];

export const popularTopics: Topic[] = [
  "AI",
  "Blockchain",
  "Healthcare",
  "Fintech",
  "Gaming",
  "Sustainability",
  "Developer Tools",
  "Robotics",
];

// =============================================================================
// Mock Profiles (for Leaderboard)
// =============================================================================

export const mockProfiles: Profile[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    username: "alice_chen",
    full_name: "Alice Chen",
    linkedin_url: "https://linkedin.com/in/alicechen",
    company: "Google",
    university: "TUM",
    role: "user",
    elo: 2847,
    created_at: "2024-06-15T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    username: "bob_smith",
    full_name: "Bob Smith",
    linkedin_url: "https://linkedin.com/in/bobsmith",
    company: "Microsoft",
    university: "LMU",
    role: "user",
    elo: 2756,
    created_at: "2024-05-20T09:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    username: "carol_wang",
    full_name: "Carol Wang",
    linkedin_url: null,
    company: "Meta",
    university: "HM",
    role: "user",
    elo: 2689,
    created_at: "2024-07-10T14:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    username: "david_park",
    full_name: "David Park",
    linkedin_url: "https://linkedin.com/in/davidpark",
    company: "Amazon",
    university: "TUM",
    role: "user",
    elo: 2634,
    created_at: "2024-04-15T11:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    username: "emma_wilson",
    full_name: "Emma Wilson",
    linkedin_url: null,
    company: null,
    university: "LMU",
    role: "user",
    elo: 2587,
    created_at: "2024-08-01T08:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    username: "frank_liu",
    full_name: "Frank Liu",
    linkedin_url: "https://linkedin.com/in/frankliu",
    company: "Startup XYZ",
    university: null,
    role: "user",
    elo: 2543,
    created_at: "2024-03-22T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    username: "grace_kim",
    full_name: "Grace Kim",
    linkedin_url: null,
    company: null,
    university: "TUM",
    role: "user",
    elo: 2498,
    created_at: "2024-09-05T12:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    username: "henry_zhang",
    full_name: "Henry Zhang",
    linkedin_url: "https://linkedin.com/in/henryzhang",
    company: "SAP",
    university: "HM",
    role: "user",
    elo: 2456,
    created_at: "2024-02-18T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    username: "ivy_johnson",
    full_name: "Ivy Johnson",
    linkedin_url: null,
    company: null,
    university: "LMU",
    role: "user",
    elo: 2412,
    created_at: "2024-10-12T09:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    username: "jack_brown",
    full_name: "Jack Brown",
    linkedin_url: "https://linkedin.com/in/jackbrown",
    company: "BMW",
    university: "TUM",
    role: "user",
    elo: 2378,
    created_at: "2024-01-30T15:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    username: "lisa_mueller",
    full_name: "Lisa Müller",
    linkedin_url: null,
    company: null,
    university: "TUM",
    role: "user",
    elo: 2234,
    created_at: "2024-11-05T10:00:00Z",
  },
];

// =============================================================================
// Mock Hackathons
// =============================================================================

export const mockHackathons: Hackathon[] = [
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    name: "AI Innovation Summit",
    description: "Build the next generation of AI-powered applications. Join developers, designers, and entrepreneurs to create innovative solutions using cutting-edge AI technologies.",
    location: "Munich",
    start_timestamp: "2026-01-20T09:00:00Z",
    end_timestamp: "2026-01-21T18:00:00Z",
    topics: ["AI", "Data Science", "Cloud"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440002",
    name: "Web3 Builder Fest",
    description: "Decentralize the future with blockchain technology. Create dApps, smart contracts, and Web3 solutions.",
    location: "Berlin",
    start_timestamp: "2026-02-05T09:00:00Z",
    end_timestamp: "2026-02-06T18:00:00Z",
    topics: ["Blockchain", "Fintech", "Web"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440003",
    name: "Climate Tech Hack",
    description: "Create sustainable solutions for a greener planet. Focus on environmental impact and sustainability.",
    location: "Zurich",
    start_timestamp: "2026-02-15T09:00:00Z",
    end_timestamp: "2026-02-16T18:00:00Z",
    topics: ["Sustainability", "IoT", "Agriculture"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440004",
    name: "FinTech Challenge",
    description: "Revolutionize banking and financial services. Build the future of money and finance.",
    location: "London",
    start_timestamp: "2026-03-01T09:00:00Z",
    end_timestamp: "2026-03-02T18:00:00Z",
    topics: ["Fintech", "AI", "Cybersecurity"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440005",
    name: "HealthTech Hackathon",
    description: "Improve healthcare through innovative technology. Create solutions that save lives.",
    location: "Munich",
    start_timestamp: "2026-03-12T09:00:00Z",
    end_timestamp: "2026-03-13T18:00:00Z",
    topics: ["Healthcare", "AI", "Mobile"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440006",
    name: "Gaming & Metaverse Jam",
    description: "Build immersive gaming experiences. Create the next generation of interactive entertainment.",
    location: "Paris",
    start_timestamp: "2026-03-25T09:00:00Z",
    end_timestamp: "2026-03-26T18:00:00Z",
    topics: ["Gaming", "VR", "AR"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440007",
    name: "DevTools Summit",
    description: "Create tools that developers love. Build productivity solutions for the dev community.",
    location: "Berlin",
    start_timestamp: "2026-04-05T09:00:00Z",
    end_timestamp: "2026-04-06T18:00:00Z",
    topics: ["Developer Tools", "Cloud", "Productivity"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440008",
    name: "EdTech Innovation",
    description: "Transform education with technology. Make learning accessible and engaging for everyone.",
    location: "Zurich",
    start_timestamp: "2026-04-18T09:00:00Z",
    end_timestamp: "2026-04-19T18:00:00Z",
    topics: ["Education", "AI", "Mobile"],
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440009",
    name: "Robotics & Hardware Hack",
    description: "Build the robots of tomorrow. Combine hardware and software for physical computing.",
    location: "London",
    start_timestamp: "2026-05-02T09:00:00Z",
    end_timestamp: "2026-05-03T18:00:00Z",
    topics: ["Robotics", "Hardware", "IoT"],
  },
];

// =============================================================================
// Mock Teams (for Hackathon Detail)
// =============================================================================

export const mockTeams: Team[] = [
  {
    id: "770e8400-e29b-41d4-a716-446655440001",
    name: "Neural Ninjas",
    hackathon_id: "660e8400-e29b-41d4-a716-446655440001",
    rank: 1,
    members: [
      { id: "550e8400-e29b-41d4-a716-446655440001", username: "alice_chen", full_name: "Alice Chen", company: "Google", university: "TUM" },
      { id: "550e8400-e29b-41d4-a716-446655440002", username: "bob_smith", full_name: "Bob Smith", company: "Microsoft", university: "LMU" },
      { id: "550e8400-e29b-41d4-a716-446655440011", username: "lisa_mueller", full_name: "Lisa Müller", company: null, university: "TUM" },
    ],
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440002",
    name: "Data Dragons",
    hackathon_id: "660e8400-e29b-41d4-a716-446655440001",
    rank: 2,
    members: [
      { id: "550e8400-e29b-41d4-a716-446655440003", username: "carol_wang", full_name: "Carol Wang", company: "Meta", university: "HM" },
      { id: "550e8400-e29b-41d4-a716-446655440004", username: "david_park", full_name: "David Park", company: "Amazon", university: "TUM" },
    ],
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440003",
    name: "Cloud Crushers",
    hackathon_id: "660e8400-e29b-41d4-a716-446655440001",
    rank: 3,
    members: [
      { id: "550e8400-e29b-41d4-a716-446655440005", username: "emma_wilson", full_name: "Emma Wilson", company: null, university: "LMU" },
      { id: "550e8400-e29b-41d4-a716-446655440006", username: "frank_liu", full_name: "Frank Liu", company: "Startup XYZ", university: null },
      { id: "550e8400-e29b-41d4-a716-446655440007", username: "grace_kim", full_name: "Grace Kim", company: null, university: "TUM" },
    ],
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440004",
    name: "Algorithm Avengers",
    hackathon_id: "660e8400-e29b-41d4-a716-446655440001",
    rank: 4,
    members: [
      { id: "550e8400-e29b-41d4-a716-446655440008", username: "henry_zhang", full_name: "Henry Zhang", company: "SAP", university: "HM" },
      { id: "550e8400-e29b-41d4-a716-446655440009", username: "ivy_johnson", full_name: "Ivy Johnson", company: null, university: "LMU" },
    ],
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440005",
    name: "Byte Busters",
    hackathon_id: "660e8400-e29b-41d4-a716-446655440001",
    rank: 5,
    members: [
      { id: "550e8400-e29b-41d4-a716-446655440010", username: "jack_brown", full_name: "Jack Brown", company: "BMW", university: "TUM" },
    ],
  },
];

// =============================================================================
// Mock Rank History (for Profile ELO Chart)
// =============================================================================

export const mockRankHistory: RankHistory[] = [
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 1500, created_at: "2024-06-15" },
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 1650, created_at: "2024-07-20" },
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 1890, created_at: "2024-08-25" },
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 2100, created_at: "2024-10-10" },
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 2450, created_at: "2024-12-01" },
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 2650, created_at: "2025-02-15" },
  { user: "550e8400-e29b-41d4-a716-446655440001", elo: 2847, created_at: "2025-04-20" },
];

// =============================================================================
// Mock Hackathon Participations (for Profile History)
// =============================================================================

export const mockParticipations: HackathonParticipation[] = [
  {
    hackathon_id: "660e8400-e29b-41d4-a716-446655440001",
    hackathon_name: "AI Innovation Summit",
    team_name: "Neural Ninjas",
    rank: 1,
    date: "2026-01-20",
  },
  {
    hackathon_id: "660e8400-e29b-41d4-a716-446655440010",
    hackathon_name: "ML Masters Challenge",
    team_name: "Deep Thinkers",
    rank: 1,
    date: "2025-11-15",
  },
  {
    hackathon_id: "660e8400-e29b-41d4-a716-446655440011",
    hackathon_name: "Data Science Derby",
    team_name: "Stat Squad",
    rank: 2,
    date: "2025-09-08",
  },
  {
    hackathon_id: "660e8400-e29b-41d4-a716-446655440012",
    hackathon_name: "Cloud Computing Cup",
    team_name: "Sky High",
    rank: 1,
    date: "2025-06-22",
  },
  {
    hackathon_id: "660e8400-e29b-41d4-a716-446655440013",
    hackathon_name: "Blockchain Bonanza",
    team_name: "Chain Gang",
    rank: 3,
    date: "2025-03-10",
  },
];

// =============================================================================
// Helper functions
// =============================================================================

export function getProfileById(id: string): Profile | undefined {
  return mockProfiles.find((p) => p.id === id);
}

export function getHackathonById(id: string): Hackathon | undefined {
  return mockHackathons.find((h) => h.id === id);
}

export function getTeamsByHackathonId(hackathonId: string): Team[] {
  return mockTeams.filter((t) => t.hackathon_id === hackathonId);
}

export function getRankHistoryByUserId(userId: string): RankHistory[] {
  return mockRankHistory.filter((r) => r.user === userId);
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startStr = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endStr = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${startStr}-${endDate.getDate()}, ${startDate.getFullYear()}`;
}

export function formatDateRangeLong(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startStr = startDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const endStr = endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${startStr} - ${endStr}`;
}
