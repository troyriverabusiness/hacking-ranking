import { Location, Topic } from "./enums";

export interface Hackathon {
    id: string;
    name: string;
    description: string;
    location: Location;
    start_timestamp: string;
    end_timestamp: string;
    topics: Topic[];
    created_by?: string;
}
