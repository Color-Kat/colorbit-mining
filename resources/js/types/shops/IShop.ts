import {DateTime} from "../types";

export interface IShop {
    id: number;
    name: string;
    image: string,
    slug: string;

    used_market: boolean;
    warranty: boolean;
    delivery_time: DateTime;
}
