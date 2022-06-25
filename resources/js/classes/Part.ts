import {PartType} from "@/types/parts/IBasePart";
import {PartT} from "@/types/parts/PartT";
import {GPU_VRAM_type} from "@/types/parts/IGPU";
import {PSU_EfficiencyType} from "@/types/parts/IPSU";
import {CaseMaterialType} from "@/types/parts/ICase";
import {BreakdownsPartType, IPart, ShopsPartType} from "../types/parts/IPart";

/**
 *
 */
export class Part implements IPart {
    public name: string = 'GTX 1050 TI';
    public image: string = '';
    public vendor: string = 'MSI';
    public type: PartType = 'GPU';
    public slug: string = '';
    public count: number = 10;
    public price: number = 200;

    public breakdowns: BreakdownsPartType = [];
    public breakdown_ids: number[] = [];

    public shops: ShopsPartType = [];
    public shop_ids: number[] = [];

    public created_at?: string;
    public updated_at?: string;

    public _image?: File | null = null;

    constructor(partData?: IPart) {
        // Fill base properties
        if(!partData) return;

        this.name = partData.name;
        this.slug = partData.slug;
        this.vendor = partData.vendor;
        this.type = partData.type;
        this.price = partData.price;
        this.count = partData.count ?? 10;
        this.image = partData.image;

        this.breakdowns = partData.breakdowns ?? [];
        this.breakdown_ids = partData.breakdown_ids ?? [];

        this.shops = partData.shops ?? [];
        this.shop_ids = partData.shop_ids ?? [];
    }

    static createByType(part: PartT<PartType>) {
        let partInstance: PartT<PartType>;

        switch (part.type) {
            case 'GPU': partInstance = new GPU(part); break;
            case 'platform': partInstance = new Platform(part); break;
            case 'RAM': partInstance = new RAM(part); break;
            case 'PSU': partInstance = new PSU(part); break;
            case 'case': partInstance = new Case(part); break;
        }

        // Fill additional properties for specially part: GPU, platform,..
        (partInstance as any).fillProperties(part);

        return partInstance;
    }
}

export class GPU extends Part implements PartT<'GPU'> {
    public type: "GPU" = "GPU";

    public TDP: number = 100;
    public power: number = 100;
    public GPU_VRAM_size: number = 1;
    public GPU_VRAM_frequency: number = 999;
    public GPU_VRAM_type: GPU_VRAM_type = 'GDDR5';
    public GPU_fans_count: number = 1;
    public GPU_fan_efficiency: number = 50;

    constructor(partData?: IPart) {
        super(partData);
    }

    protected fillProperties(partData: PartT<'GPU'>) {
        if(!partData.GPU_VRAM_size) return;

        this.TDP = partData.TDP;
        this.power = partData.power;
        this.GPU_VRAM_size = partData.GPU_VRAM_size;
        this.GPU_VRAM_frequency = partData.GPU_VRAM_frequency;
        this.GPU_VRAM_type = partData.GPU_VRAM_type;
        this.GPU_fans_count = partData.GPU_fans_count;
        this.GPU_fan_efficiency = partData.GPU_fan_efficiency;
    }
}

export class Platform extends Part implements PartT<'platform'> {
    public type: "platform" = "platform";

    public TDP: number = 30;
    public power: number = 100;
    public platform_cors_count: number = 1;
    public platform_threads_count: number = 1;
    public platform_frequency: number = 333;
    public platform_RAM_slots: number = 1;

    constructor(partData?: IPart) {
        super(partData);
    }

    protected fillProperties(partData: PartT<'platform'>) {
        if(!partData.platform_cors_count) return;

        this.TDP = partData.TDP ?? this.TDP;
        this.power = partData.power;
        this.platform_cors_count = partData.platform_cors_count;
        this.platform_threads_count = partData.platform_threads_count;
        this.platform_frequency = partData.platform_frequency;
        this.platform_RAM_slots = partData.platform_RAM_slots;
    }
}

export class RAM extends Part implements PartT<'RAM'> {
    public type: "RAM" = "RAM";

    public TDP: number = 20;
    public power: number = 4;
    public RAM_frequency: number = 1666;
    public RAM_size: number = 1;
    public RAM_channels: number = 1;

    constructor(partData?: IPart) {
        super(partData);
    }

    protected fillProperties(partData: PartT<'RAM'>) {
        if(!partData.RAM_frequency) return;

        this.TDP = partData.TDP;
        this.power = partData.power;
        this.RAM_frequency = partData.RAM_frequency;
        this.RAM_size = partData.RAM_size;
        this.RAM_channels = partData.RAM_channels;
    }
}

export class PSU extends Part implements PartT<'PSU'> {
    public type: "PSU" = "PSU";

    public TDP: number = 18;
    public PSU_power_supply: number = 100;
    public PSU_efficiency: PSU_EfficiencyType = 'none';

    constructor(partData?: IPart) {
        super(partData);
    }

    protected fillProperties(partData: PartT<'PSU'>) {
        if(!partData.PSU_power_supply) return;

        this.TDP = partData.TDP;
        this.PSU_power_supply = partData.PSU_power_supply;
        this.PSU_efficiency = partData.PSU_efficiency;
    }
}

export class Case extends Part implements PartT<'case'> {
    public type: "case" = "case";

    public case_material: CaseMaterialType = 'wood';
    public case_material_rus: string = 'Липа';
    public case_GPUs_count: number = 1;
    public case_critical_temp: number = 100;

    constructor(partData?: IPart) {
        super(partData);
    }

    protected fillProperties(partData: PartT<'case'>) {
        if(!partData.case_material) return;

        this.case_material = partData.case_material;
        this.case_material_rus = partData.case_material_rus;
        this.case_GPUs_count = partData.case_GPUs_count;
        this.case_critical_temp = partData.case_critical_temp;
    }
}

