export interface IProductExtra {
    id?: number;
    extraName?: string;
    description?: string;
    extraValue?: number;
    fullPhotoContentType?: string;
    fullPhoto?: any;
    fullPhotoUrl?: string;
    thumbnailPhotoContentType?: string;
    thumbnailPhoto?: any;
    thumbnailPhotoUrl?: string;
    productProductName?: string;
    productId?: number;
}

export class ProductExtra implements IProductExtra {
    constructor(
        public id?: number,
        public extraName?: string,
        public description?: string,
        public extraValue?: number,
        public fullPhotoContentType?: string,
        public fullPhoto?: any,
        public fullPhotoUrl?: string,
        public thumbnailPhotoContentType?: string,
        public thumbnailPhoto?: any,
        public thumbnailPhotoUrl?: string,
        public productProductName?: string,
        public productId?: number
    ) {}
}
