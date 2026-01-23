// ==============================================
// Enum Types
// ==============================================

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

// User roles
export type Role = "user" | "admin" | "organizer";


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
]

export const universities: University[] = ["TUM", "LMU", "HM"];

export const roles: Role[] = ["user", "admin", "organizer"];