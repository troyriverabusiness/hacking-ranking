
export interface Team {
    id: string;
    name: string;
    hackathon_id: string;
    rank: number;
    members: string[];     // Foreign keys to Profile table
}