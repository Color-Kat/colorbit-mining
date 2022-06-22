<?php

namespace App\traits;

trait PartRules
{
    /**
     * Return array of validation rules
     *
     * @return string[]
     */
    protected function partsRules() {
        return [
            'name' => 'required|max:100',
            'image' => 'nullable|string',
            'vendor' => 'required|max:100',
            'type' => 'required',
            'slug' => 'nullable|unique:parts,slug',
            'price' => 'required|numeric|min:0',

            'GPU_VRAM_size' => 'numeric|min:1',
            'GPU_VRAM_frequency' => 'numeric|min:1',
            'GPU_VRAM_type' => 'string|in:GDDR4,GDDR5,GDDR5x,GDDR6,GDDR6x',
            'GPU_fans_count' => 'numeric|min:0',
            'GPU_fans_efficiency' => 'numeric|min:0|max:100',

            'platform_cors_count' => 'numeric|min:1',
            'platform_threads_count' => 'numeric|min:1',
            'platform_frequency' => 'numeric|min:1',
            'platform_RAM_slots' => 'numeric|min:1',

            'RAM_size' => 'numeric|min:1',
            'RAM_frequency' => 'numeric|min:1',
            'RAM_channels' => 'numeric|min:1',

            'PSU_power_supply' => 'numeric|min:1',
            'PSU_efficiency' => 'string|in:none,bronze,silver,gold,platinum,titanium',

            'case_material' => 'string|in:wood,wooden,iron,aluminium,diamond,zinc',
            'case_material_rus' => 'string',
            'case_GPUs_slots' => 'numeric|min:1',
            'case_critical_temp' => 'numeric|min:0'
        ];
    }

    /**
     * Return messages for validation errors
     *
     * @return string[]
     */
    protected function partsMessages() {
        return [

        ];
    }
}
