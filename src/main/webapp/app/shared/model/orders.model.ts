import { Moment } from 'moment';
import { IOrdersLine } from 'app/shared/model/orders-line.model';

export const enum OrderStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    READY = 'READY',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED'
}

export interface IOrders {
    id?: number;
    description?: string;
    customerName?: string;
    totalPrice?: number;
    quantity?: number;
    discountPercentage?: number;
    discountAmount?: number;
    taxPercentage?: number;
    taxAmount?: number;
    orderStatus?: OrderStatus;
    note?: string;
    orderDate?: Moment;
    isVariantOrder?: boolean;
    ordersLines?: IOrdersLine[];
    paymentMethodPaymentMethod?: string;
    paymentMethodId?: number;
    soldByFirstName?: string;
    soldById?: number;
    preparedByFirstName?: string;
    preparedById?: number;
    shopDeviceDeviceName?: string;
    shopDeviceId?: number;
    sectionTableTableNumber?: string;
    sectionTableId?: number;
    shopShopName?: string;
    shopId?: number;
}

export class Orders implements IOrders {
    constructor(
        public id?: number,
        public description?: string,
        public customerName?: string,
        public totalPrice?: number,
        public quantity?: number,
        public discountPercentage?: number,
        public discountAmount?: number,
        public taxPercentage?: number,
        public taxAmount?: number,
        public orderStatus?: OrderStatus,
        public note?: string,
        public orderDate?: Moment,
        public isVariantOrder?: boolean,
        public ordersLines?: IOrdersLine[],
        public paymentMethodPaymentMethod?: string,
        public paymentMethodId?: number,
        public soldByFirstName?: string,
        public soldById?: number,
        public preparedByFirstName?: string,
        public preparedById?: number,
        public shopDeviceDeviceName?: string,
        public shopDeviceId?: number,
        public sectionTableTableNumber?: string,
        public sectionTableId?: number,
        public shopShopName?: string,
        public shopId?: number
    ) {
        this.isVariantOrder = this.isVariantOrder || false;
    }
}
