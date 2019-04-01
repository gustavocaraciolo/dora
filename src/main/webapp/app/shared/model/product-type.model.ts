export interface IProductType {
    id?: number;
    productType?: string;
    productTypeDescription?: string;
    shopShopName?: string;
    shopId?: number;
}

export class ProductType implements IProductType {
    constructor(
        public id?: number,
        public productType?: string,
        public productTypeDescription?: string,
        public shopShopName?: string,
        public shopId?: number
    ) {}
}
