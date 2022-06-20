import {IBasePart} from "./IBasePart";

export interface IRAM extends IBasePart {
    type: 'RAM';
    RAM_frequency: number;
    RAM_size: number;
    RAM_channels: number;
}
