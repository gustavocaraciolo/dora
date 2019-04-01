import { Moment } from 'moment';

export interface IEmployeeTimesheet {
    id?: number;
    checkinTime?: Moment;
    checkOutTime?: Moment;
    regularHoursWorked?: number;
    overTimeHoursWorked?: number;
    pay?: number;
    profileFirstName?: string;
    profileId?: number;
    shopShopName?: string;
    shopId?: number;
}

export class EmployeeTimesheet implements IEmployeeTimesheet {
    constructor(
        public id?: number,
        public checkinTime?: Moment,
        public checkOutTime?: Moment,
        public regularHoursWorked?: number,
        public overTimeHoursWorked?: number,
        public pay?: number,
        public profileFirstName?: string,
        public profileId?: number,
        public shopShopName?: string,
        public shopId?: number
    ) {}
}
