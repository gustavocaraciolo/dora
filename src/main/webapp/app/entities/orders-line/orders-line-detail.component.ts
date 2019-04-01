import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrdersLine } from 'app/shared/model/orders-line.model';

@Component({
    selector: 'jhi-orders-line-detail',
    templateUrl: './orders-line-detail.component.html'
})
export class OrdersLineDetailComponent implements OnInit {
    ordersLine: IOrdersLine;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordersLine }) => {
            this.ordersLine = ordersLine;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
