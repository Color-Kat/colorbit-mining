import {DateTime, Nullable} from "./types";

export interface IUser {
    id: number;
    name: string;
    money: number;
    email: string;

    isAdmin?: boolean;
    role: Role;

    profile_photo_path: Nullable<string>;
    profile_photo_url: string;

    created_at: DateTime;

    // email_verified_at: Nullable<DateTime>;
    // updated_at: DateTime;
}

export interface Role {
    id: number;
    name: string;
    slug: string;
}
