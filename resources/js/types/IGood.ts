import {PartT} from "./parts/PartT";
import {IBasePart, PartType} from "./parts/IBasePart";
import {IGPU} from "./parts/IGPU";
import {IPlatform} from "./parts/IPlatform";
import {IRAM} from "./parts/IRAM";
import {IPSU} from "./parts/IPSU";
import {ICase} from "./parts/ICase";

export interface IGood{
    id: number;
    count: number;
}


// GPU_VRAM_frequency: null
// GPU_VRAM_size: null
// GPU_VRAM_type: null
// GPU_fan_efficiency: null
// GPU_fans_count: null
// PSU_efficiency: "none"
// PSU_power_supply: 750
// RAM_channels: null
// RAM_frequency: null
// RAM_size: null
// TDP: 70
// breakdowns: [{…}]
// case_GPUs_count: null
// case_critical_temp: null
// case_material: null
// case_material_rus: null
// count: 10

// platform_RAM_slots: null
// platform_cors_count: null
// platform_frequency: null
// platform_threads_count: null
// power: null
// price: 25
// shops: (2) [{…}, {…}]
// slug: "kcass"
// type: "PSU"
// vendor: "AeroCool"
