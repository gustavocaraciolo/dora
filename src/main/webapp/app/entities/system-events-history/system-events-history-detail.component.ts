import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISystemEventsHistory } from 'app/shared/model/system-events-history.model';

@Component({
    selector: 'jhi-system-events-history-detail',
    templateUrl: './system-events-history-detail.component.html'
})
export class SystemEventsHistoryDetailComponent implements OnInit {
    systemEventsHistory: ISystemEventsHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ systemEventsHistory }) => {
            this.systemEventsHistory = systemEventsHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
