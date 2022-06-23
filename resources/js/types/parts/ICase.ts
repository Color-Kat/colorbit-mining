import {IBasePart} from "./IBasePart";

export type CaseMaterialType = 'wood' | 'iron' | 'aluminium' | 'titanium';

export interface ICase extends IBasePart {
    type: 'case';
    case_material: CaseMaterialType;
    case_material_rus: string;
    case_GPUs_count: number;
    case_critical_temp: number;
}
