import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';

@Component({
    selector: 'jhi-orders-line-variant-detail',
    templateUrl: './orders-line-variant-detail.component.html'
})
export class OrdersLineVariantDetailComponent implements OnInit {
    ordersLineVariant: IOrdersLineVariant;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordersLineVariant }) => {
            this.ordersLineVariant = ordersLineVariant;
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
