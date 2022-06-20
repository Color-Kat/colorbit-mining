import {IBasePart, PartType} from "./IBasePart";
import {IGPU} from "./IGPU";
import {IPlatform} from "./IPlatform";
import {IRAM} from "./IRAM";
import {IPSU} from "./IPSU";
import {ICase} from "./ICase";

// export interface IPart extends IBasePart, IGPU, IPlatform, IRAM, IPSU, ICase {
//
// }

// export type PartT = IBasePart & (IGPU | IPlatform | IRAM | IPSU | ICase);
export type PartT<T extends PartType> = IBasePart & (
    T extends 'GPU' ? IGPU :
        T extends 'platform' ? IPlatform :
            T extends 'RAM' ? IRAM :
                T extends 'PSU' ? IPSU : ICase
);



