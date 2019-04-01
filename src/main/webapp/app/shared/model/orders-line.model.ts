import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';

export interface IOrdersLine {
    id?: number;
    ordersLineName?: string;
    ordersLineValue?: string;
    ordersLinePrice?: number;
    ordersLineDescription?: string;
    thumbnailPhotoContentType?: string;
    thumbnailPhoto?: any;
    fullPhotoContentType?: string;
    fullPhoto?: any;
    fullPhotoUrl?: string;
    thumbnailPhotoUrl?: string;
    ordersId?: number;
    ordersLineVariants?: IOrdersLineVariant[];
    productProductName?: string;
    productId?: number;
}

export class OrdersLine implements IOrdersLine {
    constructor(
        public id?: number,
        public ordersLineName?: string,
        public ordersLineValue?: string,
        public ordersLinePrice?: number,
        public ordersLineDescription?: string,
        public thumbnailPhotoContentType?: string,
        public thumbnailPhoto?: any,
        public fullPhotoContentType?: string,
        public fullPhoto?: any,
        public fullPhotoUrl?: string,
        public thumbnailPhotoUrl?: string,
        public ordersId?: number,
        public ordersLineVariants?: IOrdersLineVariant[],
        public productProductName?: string,
        public productId?: number
    ) {}
}
