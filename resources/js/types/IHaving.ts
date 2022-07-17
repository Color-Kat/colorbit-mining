import {IBasePart} from "./parts/IBasePart";

export type HavingStateType = 'not_used' | 'used' | 'needs_repair' | 'broken';

export interface IHaving<T = IBasePart>{
    id: number;
    state: HavingStateType;
    message: string;
    for_sale: boolean;

    temp: number | null;
    max_temp: number | null;
    loading: number | null;
    current_power: number | null;
    wear: number;
    dust: number;

    part: T;
    shop: {
        id: number,
        slug: string,
        warranty: boolean,
        used_market: boolean
    };
    rig: {
        id: number;
        name: string;
    }
}
