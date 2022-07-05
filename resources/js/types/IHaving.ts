import {IBasePart} from "./parts/IBasePart";

export type HavingState = 'used' | 'not_used' | 'for_sale';

export interface IHaving{
    id: number;
    state: HavingState;
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
