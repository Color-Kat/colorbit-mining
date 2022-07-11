import {IBasePart} from "./parts/IBasePart";
import {IGPU} from "./parts/IGPU";
import {IPlatform} from "./parts/IPlatform";
import {IRAM} from "./parts/IRAM";
import {IPSU} from "./parts/IPSU";
import {ICase} from "./parts/ICase";
import {IHaving} from "./IHaving";

export type RigStateType = 'on' | 'off' | 'broken';

export interface IRig{
    id: number;
    name: string;
    state: RigStateType;
    general_temp: number;
    current_power: number;

    GPU: IHaving<IGPU>;
    platform: IHaving<IPlatform>;
    RAM: IHaving<IRAM>;
    PSU: IHaving<IPSU>;
    case: IHaving<ICase>;
}
