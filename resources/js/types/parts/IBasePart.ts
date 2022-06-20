export type PartType = 'GPU' | 'platform' | 'RAM' | 'PSU' | 'case';

export interface IBasePart {
    id?: number;
    name: string;
    image: string;
    vendor: string;
    slug: string;
    price: number; // In $$$
    created_at?: string;
    updated_at?: string;

    _image?: File | null;
}
