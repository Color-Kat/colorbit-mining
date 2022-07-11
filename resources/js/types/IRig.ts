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
    maxPower: number;

    GPU: IHaving<IGPU> | null;
    platform: IHaving<IPlatform> | null;
    RAM: IHaving<IRAM> | null;
    PSU: IHaving<IPSU> | null;
    case: IHaving<ICase> | null;
}
