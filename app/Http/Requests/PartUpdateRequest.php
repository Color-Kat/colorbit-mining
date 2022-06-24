<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PartUpdateRequest extends FormRequest
{
    use \App\traits\PartRules;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = $this->partsRules();
        $rules['slug'] = '';

        return $rules;
    }

    /**
     * Aliases for attributes
     *
     * @return string[]
     */
    public function attributes()
    {
        return $this->partsAliases();

    }

    /**
     * Get the validation messages
     *
     * @return array|string[]
     */
    public function messages()
    {
        return $this->partsMessages();
    }
}
