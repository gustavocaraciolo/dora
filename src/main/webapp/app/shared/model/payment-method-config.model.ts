export interface IPaymentMethodConfig {
    id?: number;
    key?: string;
    value?: string;
    note?: string;
    enabled?: boolean;
    paymentMethodPaymentMethod?: string;
    paymentMethodId?: number;
}

export class PaymentMethodConfig implements IPaymentMethodConfig {
    constructor(
        public id?: number,
        public key?: string,
        public value?: string,
        public note?: string,
        public enabled?: boolean,
        public paymentMethodPaymentMethod?: string,
        public paymentMethodId?: number
    ) {
        this.enabled = this.enabled || false;
    }
}
