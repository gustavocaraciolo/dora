import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISectionTable } from 'app/shared/model/section-table.model';

@Component({
    selector: 'jhi-section-table-detail',
    templateUrl: './section-table-detail.component.html'
})
export class SectionTableDetailComponent implements OnInit {
    sectionTable: ISectionTable;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sectionTable }) => {
            this.sectionTable = sectionTable;
        });
    }

    previousState() {
        window.history.back();
    }
}
