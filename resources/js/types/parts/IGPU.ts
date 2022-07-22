import {IBasePart} from "./IBasePart";

export type GPU_VRAM_type = 'GDDR4' | 'GDDR5' | 'GDDR5X' | 'GDDR6' | 'GDDR6X';

export interface IGPU extends IBasePart {
    type: 'GPU';
    TDP: number;
    power: number;
    GPU_VRAM_size: number;
    GPU_VRAM_type: GPU_VRAM_type;
    GPU_VRAM_bit: number; // Width of memory interface, bit
    GPU_VRAM_bandwidth: number; // Bandwidth of memory
    GPU_st_processors: number; // Number of streaming processors (cuda for nvidia)
    GPU_chip_frequency: number; // Frequency of gpu chip
    GPU_fans_count: number; // Number of fans (0 - passive cooling)
    GPU_fan_efficiency: number; // Efficiency of fans 0-100%
}
