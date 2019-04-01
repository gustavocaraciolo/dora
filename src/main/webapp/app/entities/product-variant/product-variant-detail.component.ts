import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductVariant } from 'app/shared/model/product-variant.model';

@Component({
    selector: 'jhi-product-variant-detail',
    templateUrl: './product-variant-detail.component.html'
})
export class ProductVariantDetailComponent implements OnInit {
    productVariant: IProductVariant;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productVariant }) => {
            this.productVariant = productVariant;
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
