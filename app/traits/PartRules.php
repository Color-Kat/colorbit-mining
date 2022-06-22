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
            '_image' => 'nullable|mimes:jpg,jpeg,png|max:1024',
            'vendor' => 'required|max:100',
            'type' => 'required',
            'slug' => 'nullable|unique:parts,slug',
            'price' => 'required|numeric|min:0',

            'TDP' => 'numeric|min:0',
            'power' => 'numeric|min:0',

            'shop_ids' => 'array',
            'breakdown_ids' => 'array',

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

            'case_material' => 'string|in:wood,wooden,iron,aluminium,diamond,zinc,titanium',
            'case_material_rus' => 'string',
            'case_GPUs_slots' => 'numeric|min:1',
            'case_critical_temp' => 'numeric|min:0'
        ];
    }

    /**
     * Get aliases for attributes of rules
     *
     * @return string[]
     */
    protected function partsAliases() {
        return [
            'name' => 'Название',
            'image' => 'Фото',
            'vendor' => 'Вендор',
            'type' => 'Тип',
            'slug' => 'Идентификатор',
            'price' => 'Цена',

            'GPU_VRAM_size' => 'Количество видеопамяти',
            'GPU_VRAM_frequency' => 'Количество видеопамяти',
            'GPU_VRAM_type' => 'Тип видеопамяти',
            'GPU_fans_count' => 'Кол-во вентиляторов',
            'GPU_fans_efficiency' => 'Эффективность вентиляторов',

            'platform_cors_count' => 'Количество ядер ЦП',
            'platform_threads_count' => 'Количество потоков ЦП',
            'platform_frequency' => 'Частота ЦП',
            'platform_RAM_slots' => 'Количество ядер ЦП',

            'RAM_size' => 'Объём ОЗУ',
            'RAM_frequency' => 'Частота ОЗУ',
            'RAM_channels' => 'Количество каналов ОЗУ',

            'PSU_power_supply' => 'Мощность БП',
            'PSU_efficiency' => 'Сертификат БП',

            'case_material' => 'Материал каркаса',
            'case_material_rus' => 'Название материала',
            'case_GPUs_slots' => 'Кол-во слотов для видеокарты',
            'case_critical_temp' => 'Критическая температура'
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
