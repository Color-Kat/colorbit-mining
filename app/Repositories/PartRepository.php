<?php

namespace App\Repositories;

use App\Models\Part;
use Illuminate\Support\Str;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class PartRepository extends CoreRepository
{
    /**
     * Define model class
     * @return string
     */
    protected function getModelClass(): string
    {
        return Part::class;
    }

    /**
     * Return all with paginator
     */
    public function getAllWithPaginator()
    {
        $result = $this
            ->startConditions()
            ->select(['id', 'name', 'vendor', 'image', 'slug', 'type', 'price'])
            ->orderBy('id', 'DESC')
            ->paginate(10);
        return $result;
    }

    /**
     * Return all parts by type with paginator
     */
    public function getByTypeWithPaginator(string $type)
    {
        $select = ['id', 'name', 'vendor', 'image', 'slug', 'type', 'price'];

        $result = $this->startConditions()->select($select)
            ->where('type', $type)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return $result;
    }

    /**
     * Create part in DB from $request data
     */
    public function storePart($request)
    {
        $data = $request->all();

        // Create slug
        if (empty($data['slug'])) $data['slug'] = Str::slug($data['name']);
        else $data['slug'] = Str::slug($data['slug']);

        // Set default image url
        if (!$data['_image']) $data['image'] = 'default-images/' . $data['type'] . '-default.png';

        // Create base part
        $result = $this->startConditions()->create($data);

        // Relationships
        $result
            ->breakdowns()
            ->attach($data['breakdown_ids']);

        $result
            ->shops()
            ->attach($data['shop_ids']);

        if ($data['_image']) $result->updateImage($data['_image'], 'image', 'parts');


        return $result;
    }

    /**
     * Get prepared data for edit form
     */
    public function getForEdit($id)
    {
        $result = $this
            ->startConditions()
            ->where('id', $id)
            ->first();

        $result['breakdown_ids'] = $result->breakdowns()->pluck('breakdown_id')->toArray();
        $result['shop_ids'] = $result->shops()->pluck('shop_id')->toArray();

        return $result;
    }

    /**
     * Edit existing part in db by $request data
     */
    public function updatePart($request, $id)
    {
        $data = $request->all();
        $part = $this
            ->startConditions()
            ->find($id);

        // Create slug
        if (empty($data['slug'])) $data['slug'] = Str::slug($data['name']);
        else $data['slug'] = Str::slug($data['slug']);

        // Delete image url to not rewrite it
        // New image is stored in _image
        unset($data['image']);

        // Update base part
        $result = $part->update($data);

        // Relationships
        $part
            ->breakdowns()
            ->sync($data['breakdown_ids'] ?? []);

        $part
            ->shops()
            ->sync($data['shop_ids'] ?? []);

        if ($data['_image']) $part->updateImage($data['_image'], 'parts');

        return $result;
    }

    /**
     * Delete existing part in db
     */
    public function deletePart($id)
    {
        $part = $this
            ->startConditions()
            ->find($id);


        $part->deleteImage(); // Delete image from storage

        $result = $part->delete(); // Soft delete

        return $result;
    }
}
