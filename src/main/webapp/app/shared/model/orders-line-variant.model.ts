import { IOrdersLineExtra } from 'app/shared/model/orders-line-extra.model';

export interface IOrdersLineVariant {
    id?: number;
    variantName?: string;
    variantValue?: string;
    description?: string;
    percentage?: number;
    fullPhotoContentType?: string;
    fullPhoto?: any;
    fullPhotoUrl?: string;
    thumbnailPhotoContentType?: string;
    thumbnailPhoto?: any;
    thumbnailPhotoUrl?: string;
    price?: number;
    ordersLineId?: number;
    ordersLineExtras?: IOrdersLineExtra[];
}

export class OrdersLineVariant implements IOrdersLineVariant {
    constructor(
        public id?: number,
        public variantName?: string,
        public variantValue?: string,
        public description?: string,
        public percentage?: number,
        public fullPhotoContentType?: string,
        public fullPhoto?: any,
        public fullPhotoUrl?: string,
        public thumbnailPhotoContentType?: string,
        public thumbnailPhoto?: any,
        public thumbnailPhotoUrl?: string,
        public price?: number,
        public ordersLineId?: number,
        public ordersLineExtras?: IOrdersLineExtra[]
    ) {}
}
