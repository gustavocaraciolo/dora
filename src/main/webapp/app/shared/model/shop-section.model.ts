export interface IShopSection {
    id?: number;
    sectionName?: string;
    description?: string;
    surchargePercentage?: number;
    surchargeFlatAmount?: number;
    usePercentage?: boolean;
    shopShopName?: string;
    shopId?: number;
}

export class ShopSection implements IShopSection {
    constructor(
        public id?: number,
        public sectionName?: string,
        public description?: string,
        public surchargePercentage?: number,
        public surchargeFlatAmount?: number,
        public usePercentage?: boolean,
        public shopShopName?: string,
        public shopId?: number
    ) {
        this.usePercentage = this.usePercentage || false;
    }
}
