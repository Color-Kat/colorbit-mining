type DateTime = string;

export type Nullable<T> = T | null;

export interface User {
    id: number;
    name: string;
    money: number;
    email: string;

    isAdmin?: boolean;
    role?: Role;

    profile_photo_path: Nullable<string>;
    profile_photo_url: string;

    created_at: DateTime;

    // email_verified_at: Nullable<DateTime>;
    // updated_at: DateTime;
}

export type InertiaSharedProps<T = {}> = T & {
    user: User & {
        role?: Role
    };
    errorBags: any;
    errors: any;
};

export interface Session {
    id: number;
    ip_address: string;
    is_current_device: boolean;
    agent: {
        is_desktop: boolean;
        platform: string;
        browser: string;
    };
    last_active: DateTime;
}

export interface ApiToken {
    id: number;
    name: string;
    abilities: string[];
    last_used_ago: Nullable<DateTime>;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface Role {
    id: number;
    name: string;
    slug: string;
}

export interface TeamInvitation {
    id: number;
    team_id: number;
    email: string;
    role: Nullable<string>;
    created_at: DateTime;
    updated_at: DateTime;
}
