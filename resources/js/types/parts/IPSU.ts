import {IBasePart} from "./IBasePart";

export type PSU_EfficiencyType = 'none' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'titanium';

export interface IPSU extends IBasePart {
    type: 'PSU';
    TDP: number;
    PSU_power_supply: number; // WATT
    PSU_efficiency: PSU_EfficiencyType;
}
