import { IProduct } from 'app/shared/model/product.model';

export interface IDiscount {
    id?: number;
    description?: string;
    percentage?: number;
    amount?: number;
    active?: boolean;
    shopShopName?: string;
    shopId?: number;
    products?: IProduct[];
}

export class Discount implements IDiscount {
    constructor(
        public id?: number,
        public description?: string,
        public percentage?: number,
        public amount?: number,
        public active?: boolean,
        public shopShopName?: string,
        public shopId?: number,
        public products?: IProduct[]
    ) {
        this.active = this.active || false;
    }
}
