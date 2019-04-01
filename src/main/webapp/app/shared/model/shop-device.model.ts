import { Moment } from 'moment';

export interface IShopDevice {
    id?: number;
    deviceName?: string;
    deviceModel?: string;
    registeredDate?: Moment;
    shopShopName?: string;
    shopId?: number;
}

export class ShopDevice implements IShopDevice {
    constructor(
        public id?: number,
        public deviceName?: string,
        public deviceModel?: string,
        public registeredDate?: Moment,
        public shopShopName?: string,
        public shopId?: number
    ) {}
}
