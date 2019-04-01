export interface IOrdersLineExtra {
    id?: number;
    ordersLineExtraName?: string;
    ordersLineExtraValue?: string;
    ordersLineExtraPrice?: number;
    ordersOptionDescription?: string;
    fullPhotoContentType?: string;
    fullPhoto?: any;
    fullPhotoUrl?: string;
    thumbnailPhotoContentType?: string;
    thumbnailPhoto?: any;
    thumbnailPhotoUrl?: string;
    ordersLineVariantId?: number;
}

export class OrdersLineExtra implements IOrdersLineExtra {
    constructor(
        public id?: number,
        public ordersLineExtraName?: string,
        public ordersLineExtraValue?: string,
        public ordersLineExtraPrice?: number,
        public ordersOptionDescription?: string,
        public fullPhotoContentType?: string,
        public fullPhoto?: any,
        public fullPhotoUrl?: string,
        public thumbnailPhotoContentType?: string,
        public thumbnailPhoto?: any,
        public thumbnailPhotoUrl?: string,
        public ordersLineVariantId?: number
    ) {}
}
