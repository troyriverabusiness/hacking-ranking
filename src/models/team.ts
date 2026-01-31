
export interface Team {
    id: string;
    name: string;
    hackathon_id: string;
    rank: number;
    members: string[];     // Foreign keys to Profile table (from team_members junction table)
    created_at?: string;
    status?: 'pending' | 'verified';
    created_by?: string;
}