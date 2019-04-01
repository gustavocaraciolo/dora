export interface IEmailBalancer {
    id?: number;
    relayId?: string;
    relayPassword?: string;
    startingCount?: number;
    endingCount?: number;
    provider?: string;
    relayPort?: number;
    enabled?: boolean;
}

export class EmailBalancer implements IEmailBalancer {
    constructor(
        public id?: number,
        public relayId?: string,
        public relayPassword?: string,
        public startingCount?: number,
        public endingCount?: number,
        public provider?: string,
        public relayPort?: number,
        public enabled?: boolean
    ) {
        this.enabled = this.enabled || false;
    }
}
