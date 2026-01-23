export interface RankHistory {
    user: string; // Foreign key to Profile table
    elo: number;
    created_at: string;
}