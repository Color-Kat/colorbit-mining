import {IUser} from "./IUser";

export type DateTime = string;
export type Nullable<T> = T | null;

export type InertiaSharedProps<T = {}> = T & {
    user: IUser;
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
