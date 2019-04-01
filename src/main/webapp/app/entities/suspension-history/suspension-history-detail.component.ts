import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuspensionHistory } from 'app/shared/model/suspension-history.model';

@Component({
    selector: 'jhi-suspension-history-detail',
    templateUrl: './suspension-history-detail.component.html'
})
export class SuspensionHistoryDetailComponent implements OnInit {
    suspensionHistory: ISuspensionHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ suspensionHistory }) => {
            this.suspensionHistory = suspensionHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
