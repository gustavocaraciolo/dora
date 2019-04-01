import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopSection } from 'app/shared/model/shop-section.model';

@Component({
    selector: 'jhi-shop-section-detail',
    templateUrl: './shop-section-detail.component.html'
})
export class ShopSectionDetailComponent implements OnInit {
    shopSection: IShopSection;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopSection }) => {
            this.shopSection = shopSection;
        });
    }

    previousState() {
        window.history.back();
    }
}
