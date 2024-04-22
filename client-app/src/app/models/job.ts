import { User } from "./user";

export interface Job {
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
    city: string;
    country: string;
    isClosed: boolean;
    applicants: User[];
}
    