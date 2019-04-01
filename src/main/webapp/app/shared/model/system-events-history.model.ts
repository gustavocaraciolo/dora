import { Moment } from 'moment';

export interface ISystemEventsHistory {
    id?: number;
    eventName?: string;
    eventDate?: Moment;
    eventApi?: string;
    eventNote?: string;
    eventEntityName?: string;
    eventEntityId?: number;
    triggedByFirstName?: string;
    triggedById?: number;
}

export class SystemEventsHistory implements ISystemEventsHistory {
    constructor(
        public id?: number,
        public eventName?: string,
        public eventDate?: Moment,
        public eventApi?: string,
        public eventNote?: string,
        public eventEntityName?: string,
        public eventEntityId?: number,
        public triggedByFirstName?: string,
        public triggedById?: number
    ) {}
}
