export const enum ConfigType {
    STRING = 'STRING',
    BOOLEAN = 'BOOLEAN',
    NUMBER = 'NUMBER',
    DATE = 'DATE',
    FILE = 'FILE',
    OBJECT = 'OBJECT',
    ARRAY = 'ARRAY',
    GEO_POINT = 'GEO_POINT'
}

export interface ISystemConfig {
    id?: number;
    key?: string;
    value?: string;
    configurationType?: ConfigType;
    note?: string;
    enabled?: boolean;
    shopShopName?: string;
    shopId?: number;
}

export class SystemConfig implements ISystemConfig {
    constructor(
        public id?: number,
        public key?: string,
        public value?: string,
        public configurationType?: ConfigType,
        public note?: string,
        public enabled?: boolean,
        public shopShopName?: string,
        public shopId?: number
    ) {
        this.enabled = this.enabled || false;
    }
}
