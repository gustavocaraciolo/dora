import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IShopDevice } from 'app/shared/model/shop-device.model';
import { ShopDeviceService } from './shop-device.service';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';

@Component({
    selector: 'jhi-shop-device-update',
    templateUrl: './shop-device-update.component.html'
})
export class ShopDeviceUpdateComponent implements OnInit {
    shopDevice: IShopDevice;
    isSaving: boolean;

    shops: IShop[];
    registeredDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected shopDeviceService: ShopDeviceService,
        protected shopService: ShopService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shopDevice }) => {
            this.shopDevice = shopDevice;
            this.registeredDate = this.shopDevice.registeredDate != null ? this.shopDevice.registeredDate.format(DATE_TIME_FORMAT) : null;
        });
        this.shopService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IShop[]>) => mayBeOk.ok),
                map((response: HttpResponse<IShop[]>) => response.body)
            )
            .subscribe((res: IShop[]) => (this.shops = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.shopDevice.registeredDate = this.registeredDate != null ? moment(this.registeredDate, DATE_TIME_FORMAT) : null;
        if (this.shopDevice.id !== undefined) {
            this.subscribeToSaveResponse(this.shopDeviceService.update(this.shopDevice));
        } else {
            this.subscribeToSaveResponse(this.shopDeviceService.create(this.shopDevice));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopDevice>>) {
        result.subscribe((res: HttpResponse<IShopDevice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackShopById(index: number, item: IShop) {
        return item.id;
    }
}
