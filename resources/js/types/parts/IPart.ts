import {IBasePart} from "./IBasePart";

export type BreakdownsPartType = {
    id: number;
    title: string,
    description: string,
    chance: number,
    repair_chance: number,
    condition: string,
}[];

export type ShopsPartType = {
    id: number;
    name: string;
}[];

/**
 * Interface for all additional fields of part
 */
// TODO TDP and power
export interface IPart extends IBasePart{
    breakdowns?: BreakdownsPartType;
    breakdown_ids: number[];
    shops?: ShopsPartType;
    shop_ids: number[];
}
