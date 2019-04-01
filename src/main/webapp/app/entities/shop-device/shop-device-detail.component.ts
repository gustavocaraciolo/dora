import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopDevice } from 'app/shared/model/shop-device.model';

@Component({
    selector: 'jhi-shop-device-detail',
    templateUrl: './shop-device-detail.component.html'
})
export class ShopDeviceDetailComponent implements OnInit {
    shopDevice: IShopDevice;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopDevice }) => {
            this.shopDevice = shopDevice;
        });
    }

    previousState() {
        window.history.back();
    }
}
