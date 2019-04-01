import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopChange } from 'app/shared/model/shop-change.model';

@Component({
    selector: 'jhi-shop-change-detail',
    templateUrl: './shop-change-detail.component.html'
})
export class ShopChangeDetailComponent implements OnInit {
    shopChange: IShopChange;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopChange }) => {
            this.shopChange = shopChange;
        });
    }

    previousState() {
        window.history.back();
    }
}
