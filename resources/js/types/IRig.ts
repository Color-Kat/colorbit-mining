import {IBasePart} from "./parts/IBasePart";
import {IGPU} from "./parts/IGPU";
import {IPlatform} from "./parts/IPlatform";
import {IRAM} from "./parts/IRAM";
import {IPSU} from "./parts/IPSU";
import {ICase} from "./parts/ICase";

export type RigStateType = 'on' | 'off' | 'broken';

export interface IRig{
    id: number;
    name: string;
    state: RigStateType;

    GPU: IGPU;
    platform: IPlatform;
    RAM: IRAM;
    PSU: IPSU;
    case: ICase;
}
