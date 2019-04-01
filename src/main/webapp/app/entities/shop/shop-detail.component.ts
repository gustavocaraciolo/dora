import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IShop } from 'app/shared/model/shop.model';

@Component({
    selector: 'jhi-shop-detail',
    templateUrl: './shop-detail.component.html'
})
export class ShopDetailComponent implements OnInit {
    shop: IShop;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shop }) => {
            this.shop = shop;
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
