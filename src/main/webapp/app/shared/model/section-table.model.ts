export interface ISectionTable {
    id?: number;
    tableNumber?: number;
    description?: string;
    shopSectionsSectionName?: string;
    shopSectionsId?: number;
}

export class SectionTable implements ISectionTable {
    constructor(
        public id?: number,
        public tableNumber?: number,
        public description?: string,
        public shopSectionsSectionName?: string,
        public shopSectionsId?: number
    ) {}
}
