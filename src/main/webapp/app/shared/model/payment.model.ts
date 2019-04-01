import { Moment } from 'moment';

export const enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED'
}

export interface IPayment {
    id?: number;
    paymentDate?: Moment;
    paymentProvider?: string;
    amount?: number;
    paymentStatus?: PaymentStatus;
    curency?: string;
    customerName?: string;
    shopShopName?: string;
    shopId?: number;
    processedByFirstName?: string;
    processedById?: number;
    paymentMethodPaymentMethod?: string;
    paymentMethodId?: number;
    orderDescription?: string;
    orderId?: number;
}

export class Payment implements IPayment {
    constructor(
        public id?: number,
        public paymentDate?: Moment,
        public paymentProvider?: string,
        public amount?: number,
        public paymentStatus?: PaymentStatus,
        public curency?: string,
        public customerName?: string,
        public shopShopName?: string,
        public shopId?: number,
        public processedByFirstName?: string,
        public processedById?: number,
        public paymentMethodPaymentMethod?: string,
        public paymentMethodId?: number,
        public orderDescription?: string,
        public orderId?: number
    ) {}
}
