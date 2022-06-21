import {IBasePart, PartType} from "./IBasePart";
import {IGPU} from "./IGPU";
import {IPlatform} from "./IPlatform";
import {IRAM} from "./IRAM";
import {IPSU} from "./IPSU";
import {ICase} from "./ICase";
import {IPart} from "./IPart";

/**
 * Define fields by part type
 */
export type PartT<T extends PartType> = IPart & (
    T extends 'GPU' ? IGPU :
        T extends 'platform' ? IPlatform :
            T extends 'RAM' ? IRAM :
                T extends 'PSU' ? IPSU : ICase
);



