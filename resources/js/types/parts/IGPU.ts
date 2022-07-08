import {IBasePart} from "./IBasePart";

export type GPU_VRAM_type = 'GDDR4' | 'GDDR5' | 'GDDR5X' | 'GDDR6' | 'GDDR6X';

export interface IGPU extends IBasePart {
    type: 'GPU';
    TDP: number;
    power: number;
    GPU_VRAM_size: number;
    GPU_VRAM_type: GPU_VRAM_type;
    GPU_chip_frequency: number;
    GPU_fans_count: number;
    GPU_fan_efficiency: number;
}
