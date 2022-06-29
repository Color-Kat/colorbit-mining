import {DateTime} from "../types";
import {PartType} from "../parts/IBasePart";
import {IPaginator} from "../IPaginator";

export interface IShopPart {
    part_id:number;
    name: string;
    vendor: string;
    image: string;
    slug: string;
    price: number;
    type: PartType;

    pivot: {
        count: number;
    }
}

export interface IShop {
    id: number;
    name: string;
    description: string;
    image: string,
    slug: string;

    used_market: boolean;
    warranty: boolean;
    delivery_time: DateTime;

    parts: IPaginator<IShopPart>;
}
