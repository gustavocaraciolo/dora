import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrdersLineExtra } from 'app/shared/model/orders-line-extra.model';

@Component({
    selector: 'jhi-orders-line-extra-detail',
    templateUrl: './orders-line-extra-detail.component.html'
})
export class OrdersLineExtraDetailComponent implements OnInit {
    ordersLineExtra: IOrdersLineExtra;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordersLineExtra }) => {
            this.ordersLineExtra = ordersLineExtra;
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
