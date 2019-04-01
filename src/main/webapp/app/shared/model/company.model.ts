export interface ICompany {
    id?: number;
    companyName?: string;
    description?: string;
    note?: string;
    companyLogoContentType?: string;
    companyLogo?: any;
    companyLogoUrl?: string;
    active?: boolean;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public companyName?: string,
        public description?: string,
        public note?: string,
        public companyLogoContentType?: string,
        public companyLogo?: any,
        public companyLogoUrl?: string,
        public active?: boolean
    ) {
        this.active = this.active || false;
    }
}
