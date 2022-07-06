import {IBasePart} from "./parts/IBasePart";

export type HavingStateType = 'not_used' | 'used' | 'needs_repair' | 'broken';

export interface IHaving{
    id: number;
    state: HavingStateType;
    for_sale: boolean;
    temperature: number;
    wear: number;
    dust: number;
    good: {
        part: IBasePart,
        shop: {
            id: number,
            warranty: boolean,
            used_market: boolean
        }
    }
}
