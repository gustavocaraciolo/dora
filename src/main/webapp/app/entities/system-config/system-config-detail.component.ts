import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISystemConfig } from 'app/shared/model/system-config.model';

@Component({
    selector: 'jhi-system-config-detail',
    templateUrl: './system-config-detail.component.html'
})
export class SystemConfigDetailComponent implements OnInit {
    systemConfig: ISystemConfig;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ systemConfig }) => {
            this.systemConfig = systemConfig;
        });
    }

    previousState() {
        window.history.back();
    }
}
