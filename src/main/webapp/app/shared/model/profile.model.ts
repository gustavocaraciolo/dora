import { Moment } from 'moment';

export const enum ProfileType {
    SYSTEM_MANAGER = 'SYSTEM_MANAGER',
    COMPANY_MANAGER = 'COMPANY_MANAGER',
    SHOP_MANAGER = 'SHOP_MANAGER',
    EMPLOYEE = 'EMPLOYEE',
    CUSTOMER = 'CUSTOMER',
    SUPPLIER = 'SUPPLIER',
    MANAGEMENT_CEO = 'MANAGEMENT_CEO',
    MANAGEMENT_OTHER = 'MANAGEMENT_OTHER',
    ACCOUNTANT = 'ACCOUNTANT'
}

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export const enum ProfileStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    IN_ACTIVE = 'IN_ACTIVE'
}

export interface IProfile {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    userType?: ProfileType;
    dateOfBirth?: Moment;
    gender?: Gender;
    registerationDate?: Moment;
    lastAccess?: Moment;
    profileStatus?: ProfileStatus;
    telephone?: string;
    mobile?: string;
    hourlyPayRate?: number;
    thumbnailPhotoContentType?: string;
    thumbnailPhoto?: any;
    thumbnailPhotoUrl?: string;
    fullPhotoContentType?: string;
    fullPhoto?: any;
    fullPhotoUrl?: string;
    active?: boolean;
    shopChangeId?: number;
    userFirstName?: string;
    userId?: number;
    shopShopName?: string;
    shopId?: number;
}

export class Profile implements IProfile {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public userType?: ProfileType,
        public dateOfBirth?: Moment,
        public gender?: Gender,
        public registerationDate?: Moment,
        public lastAccess?: Moment,
        public profileStatus?: ProfileStatus,
        public telephone?: string,
        public mobile?: string,
        public hourlyPayRate?: number,
        public thumbnailPhotoContentType?: string,
        public thumbnailPhoto?: any,
        public thumbnailPhotoUrl?: string,
        public fullPhotoContentType?: string,
        public fullPhoto?: any,
        public fullPhotoUrl?: string,
        public active?: boolean,
        public shopChangeId?: number,
        public userFirstName?: string,
        public userId?: number,
        public shopShopName?: string,
        public shopId?: number
    ) {
        this.active = this.active || false;
    }
}
