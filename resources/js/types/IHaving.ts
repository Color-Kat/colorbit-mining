import {IBasePart} from "./parts/IBasePart";

export type HavingStateType = 'not_used' | 'used' | 'needs_repair' | 'broken';

export interface IHaving<T = IBasePart>{
    id: number;
    state: HavingStateType;
    for_sale: boolean;
    temperature: number;
    wear: number;
    dust: number;
    part: T,
    shop: {
        id: number,
        slug: string,
        warranty: boolean,
        used_market: boolean
    }
}
