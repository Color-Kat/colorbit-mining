import {IBasePart} from "./IBasePart";

export interface IPlatform extends IBasePart {
    platform_cors_count: number;
    platform_threads_count: number;
    platform_frequency: number;
    platform_RAM_slots: number;
}
