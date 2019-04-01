import { IProduct } from 'app/shared/model/product.model';

export interface ITax {
    id?: number;
    description?: string;
    percentage?: number;
    amount?: number;
    active?: boolean;
    shopShopName?: string;
    shopId?: number;
    products?: IProduct[];
}

export class Tax implements ITax {
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
