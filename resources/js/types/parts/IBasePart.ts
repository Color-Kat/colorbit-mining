export type PartType = 'GPU' | 'platform' | 'RAM' | 'PSU' | 'case';

/**
 * Base part fields. Can be used in list
 */
export interface IBasePart {
    id?: number;
    name: string;
    rawName?: string;
    image: string;
    vendor: string;
    slug: string;
    type: PartType;
    count?: number;
    price: number; // In $$$

    // created_at?: string;
    // updated_at?: string;
}
