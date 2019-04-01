import { IProduct } from 'app/shared/model/product.model';

export interface IProductCategory {
    id?: number;
    category?: string;
    description?: string;
    imageFullContentType?: string;
    imageFull?: any;
    imageFullUrl?: string;
    imageThumbContentType?: string;
    imageThumb?: any;
    imageThumbUrl?: string;
    shopShopName?: string;
    shopId?: number;
    products?: IProduct[];
}

export class ProductCategory implements IProductCategory {
    constructor(
        public id?: number,
        public category?: string,
        public description?: string,
        public imageFullContentType?: string,
        public imageFull?: any,
        public imageFullUrl?: string,
        public imageThumbContentType?: string,
        public imageThumb?: any,
        public imageThumbUrl?: string,
        public shopShopName?: string,
        public shopId?: number,
        public products?: IProduct[]
    ) {}
}
