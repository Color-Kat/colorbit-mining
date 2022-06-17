import {IBasePart} from "./IBasePart";

export interface IGPU extends IBasePart {
    GPU_VRAM_size: number;
    GPU_VRAM_frequency: number;
    GPU_VRAM_type: number;
    GPU_fans_count: number;
    GPU_fans_efficiency: number;
}
