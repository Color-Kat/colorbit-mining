import {IBasePart} from "./IBasePart";

export interface IRAM extends IBasePart {
    RAM_frequency: number;
    RAM_size: number;
    RAM_channels: number;
}
