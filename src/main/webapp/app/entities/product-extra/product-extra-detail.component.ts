import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductExtra } from 'app/shared/model/product-extra.model';

@Component({
    selector: 'jhi-product-extra-detail',
    templateUrl: './product-extra-detail.component.html'
})
export class ProductExtraDetailComponent implements OnInit {
    productExtra: IProductExtra;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productExtra }) => {
            this.productExtra = productExtra;
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
