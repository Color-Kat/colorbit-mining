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
export interface IPart extends IBasePart{
    breakdowns: BreakdownsPartType;
    shops: ShopsPartType;
}
