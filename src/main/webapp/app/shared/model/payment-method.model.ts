export interface IPaymentMethod {
    id?: number;
    paymentMethod?: string;
    description?: string;
    active?: boolean;
    shopShopName?: string;
    shopId?: number;
}

export class PaymentMethod implements IPaymentMethod {
    constructor(
        public id?: number,
        public paymentMethod?: string,
        public description?: string,
        public active?: boolean,
        public shopShopName?: string,
        public shopId?: number
    ) {
        this.active = this.active || false;
    }
}
