import {IBasePart} from "./IBasePart";

export type BreakdownsPartType = {
    title: string,
    description: string,
    chance: number,
    repair_chance: number,
    condition: string,
}[];

export type ShopsPartType = {
    name: string,
    image?: string,
    used_market: boolean,
    warranty: boolean
}[];

/**
 * Interface for all additional fields of part
 */
export interface IPart extends IBasePart{
    breakdowns: BreakdownsPartType;
    shops: ShopsPartType;
}
