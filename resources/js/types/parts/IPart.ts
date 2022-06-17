import {IBasePart} from "./IBasePart";
import {IGPU} from "./IGPU";
import {IPlatform} from "./IPlatform";
import {IRAM} from "./IRAM";
import {IPSU} from "./IPSU";
import {ICase} from "./ICase";

export interface IPart extends IBasePart, IGPU, IPlatform, IRAM, IPSU, ICase {

}
