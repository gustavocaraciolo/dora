export interface IProductVariant {
    id?: number;
    variantName?: string;
    description?: string;
    percentage?: number;
    fullPhotoContentType?: string;
    fullPhoto?: any;
    fullPhotoUrl?: string;
    thumbnailPhotoContentType?: string;
    thumbnailPhoto?: any;
    thumbnailPhotoUrl?: string;
    price?: number;
    productProductName?: string;
    productId?: number;
}

export class ProductVariant implements IProductVariant {
    constructor(
        public id?: number,
        public variantName?: string,
        public description?: string,
        public percentage?: number,
        public fullPhotoContentType?: string,
        public fullPhoto?: any,
        public fullPhotoUrl?: string,
        public thumbnailPhotoContentType?: string,
        public thumbnailPhoto?: any,
        public thumbnailPhotoUrl?: string,
        public price?: number,
        public productProductName?: string,
        public productId?: number
    ) {}
}
