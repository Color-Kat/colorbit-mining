import { IPaginator } from "@/types/IPaginator";
import {IShop, IShopPart} from "@/types/shops/IShop";

interface IWitsParts {
    parts: null;
}

export class Shop implements IWitsParts, IShop {
    public id: number = 0;
    public name: string = '';
    public description: string = '';
    public image: string = '';
    public slug: string = '';
    public used_market: boolean = false;
    public warranty: boolean = false;
    public delivery_time: string = '00:00:00';
    public parts: any = null;

    constructor(data: Partial<Shop>){
        Object.assign(this, data);
    }

    // get deliveryTime() {
    //     const rawHours = this.delivery_time.split(':')[0];
    //     return rawHours !== '00' ? rawHours : '0';
    // }
}
