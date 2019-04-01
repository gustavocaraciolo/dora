import { Moment } from 'moment';
import { IProductVariant } from 'app/shared/model/product-variant.model';
import { IProductExtra } from 'app/shared/model/product-extra.model';

export interface IProduct {
    id?: number;
    productName?: string;
    productDescription?: string;
    price?: number;
    quantity?: number;
    productImageFullContentType?: string;
    productImageFull?: any;
    productImageFullUrl?: string;
    productImageThumbContentType?: string;
    productImageThumb?: any;
    productImageThumbUrl?: string;
    dateCreated?: Moment;
    barcode?: string;
    serialCode?: string;
    priorityPosition?: number;
    active?: boolean;
    isVariantProduct?: boolean;
    variants?: IProductVariant[];
    extras?: IProductExtra[];
    productTypesProductType?: string;
    productTypesId?: number;
    shopShopName?: string;
    shopId?: number;
    discountsDescription?: string;
    discountsId?: number;
    taxesDescription?: string;
    taxesId?: number;
    categoryCategory?: string;
    categoryId?: number;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public productName?: string,
        public productDescription?: string,
        public price?: number,
        public quantity?: number,
        public productImageFullContentType?: string,
        public productImageFull?: any,
        public productImageFullUrl?: string,
        public productImageThumbContentType?: string,
        public productImageThumb?: any,
        public productImageThumbUrl?: string,
        public dateCreated?: Moment,
        public barcode?: string,
        public serialCode?: string,
        public priorityPosition?: number,
        public active?: boolean,
        public isVariantProduct?: boolean,
        public variants?: IProductVariant[],
        public extras?: IProductExtra[],
        public productTypesProductType?: string,
        public productTypesId?: number,
        public shopShopName?: string,
        public shopId?: number,
        public discountsDescription?: string,
        public discountsId?: number,
        public taxesDescription?: string,
        public taxesId?: number,
        public categoryCategory?: string,
        public categoryId?: number
    ) {
        this.active = this.active || false;
        this.isVariantProduct = this.isVariantProduct || false;
    }
}
