import { University, Role } from "./enums";

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    linkedin_url: string | null;
    company: string | null;
    university: University | null;
    role: Role;
    elo: number;
}