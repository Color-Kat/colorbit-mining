import {IBasePart, PartType} from "../types/parts/IBasePart";
import {IPart} from "../types/parts/IPart";
import {PSU_EfficiencyType} from "../types/parts/IPSU";
import {CaseMaterialType} from "../types/parts/ICase";

export class Part implements IPart{
    // public name: string = '';
    // image: string;
    // vendor: string;
    // slug: string;
    // type: PartType;
    // price: number; // In $$$
    // created_at?: string;
    // updated_at?: string;
    //
    // _image?: File | null;

    GPU_VRAM_size = 0;
    GPU_VRAM_frequency = 0;
    GPU_VRAM_type = 0;
    GPU_fans_count = 0;
    GPU_fans_efficiency = 0;

    platform_cors_count = 0;
    platform_threads_count = 0;
    platform_frequency = 0;
    platform_RAM_slots = 0;

    RAM_frequency = 0;
    RAM_size = 0;
    RAM_channels = 0;

    PSU_power_supply = 0;
    PSU_efficiency: PSU_EfficiencyType = 'none';

    case_material: CaseMaterialType = 'wood';
    case_material_rus = 'дерево';
    case_GPUs_slots = 1;
    case_critical_temp = 100           ;

    constructor(
        public name: string = '',
        public image: string = '',
        public vendor: string = '',
        public slug: string = '',
        public type: PartType = 'GPU',
        public price: number = 100,
    ) {

    }
}
