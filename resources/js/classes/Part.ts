import {IBasePart, PartType} from "@/types/parts/IBasePart";
import {PartT} from "@/types/parts/IPart";
import {GPU_VRAM_type} from "../types/parts/IGPU";

export class Part implements IBasePart {
    public name: string = '';
    public image: string = '';
    public vendor: string = '';
    public type: PartType = 'RAM';
    public slug: string = '';
    public price: number = 100;

    public _image?: File | null;

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

    // GPU_VRAM_size = 0;
    // GPU_VRAM_frequency = 0;
    // GPU_VRAM_type = 0;
    // GPU_fans_count = 0;
    // GPU_fans_efficiency = 0;
    //
    // platform_cors_count = 0;
    // platform_threads_count = 0;
    // platform_frequency = 0;
    // platform_RAM_slots = 0;
    //
    // RAM_frequency = 0;
    // RAM_size = 0;
    // RAM_channels = 0;
    //
    // PSU_power_supply = 0;
    // PSU_efficiency: PSU_EfficiencyType = 'none';
    //
    // case_material: CaseMaterialType = 'wood';
    // case_material_rus = 'дерево';
    // case_GPUs_slots = 1;
    // case_critical_temp = 100;

    constructor(partData?: IBasePart) {
        if(!partData) return;

        this.name = partData.name;
        this.slug = partData.slug;
        this.vendor = partData.vendor;
        this.type = partData.type;
        this.price = partData.price;
        this.image = partData.name;
    }
}

export class GPU extends Part implements PartT<'GPU'> {
    public type: "GPU" = "GPU";
    public GPU_VRAM_size: number = 1024;
    public GPU_VRAM_frequency: number = 999;
    public GPU_VRAM_type: GPU_VRAM_type = 'GDDR5';
    public GPU_fans_count: number = 1;
    public GPU_fans_efficiency: number = 50;

    constructor(partData?: IBasePart | PartT<'GPU'>) {
        super(partData);
    }
}
