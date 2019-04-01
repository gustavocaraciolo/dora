import { Moment } from 'moment';

export interface IShopChange {
    id?: number;
    change?: string;
    changedEntity?: string;
    note?: string;
    changeDate?: Moment;
    shopShopName?: string;
    shopId?: number;
    changedByFirstName?: string;
    changedById?: number;
}

export class ShopChange implements IShopChange {
    constructor(
        public id?: number,
        public change?: string,
        public changedEntity?: string,
        public note?: string,
        public changeDate?: Moment,
        public shopShopName?: string,
        public shopId?: number,
        public changedByFirstName?: string,
        public changedById?: number
    ) {}
}
