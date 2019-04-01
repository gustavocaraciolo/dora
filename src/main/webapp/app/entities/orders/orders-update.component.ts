import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrders } from 'app/shared/model/orders.model';
import { OrdersService } from './orders.service';
import { IPaymentMethod } from 'app/shared/model/payment-method.model';
import { PaymentMethodService } from 'app/entities/payment-method';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';
import { IShopDevice } from 'app/shared/model/shop-device.model';
import { ShopDeviceService } from 'app/entities/shop-device';
import { ISectionTable } from 'app/shared/model/section-table.model';
import { SectionTableService } from 'app/entities/section-table';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';

@Component({
    selector: 'jhi-orders-update',
    templateUrl: './orders-update.component.html'
})
export class OrdersUpdateComponent implements OnInit {
    orders: IOrders;
    isSaving: boolean;

    paymentmethods: IPaymentMethod[];

    profiles: IProfile[];

    shopdevices: IShopDevice[];

    sectiontables: ISectionTable[];

    shops: IShop[];
    orderDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ordersService: OrdersService,
        protected paymentMethodService: PaymentMethodService,
        protected profileService: ProfileService,
        protected shopDeviceService: ShopDeviceService,
        protected sectionTableService: SectionTableService,
        protected shopService: ShopService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orders }) => {
            this.orders = orders;
            this.orderDate = this.orders.orderDate != null ? this.orders.orderDate.format(DATE_TIME_FORMAT) : null;
        });
        this.paymentMethodService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPaymentMethod[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPaymentMethod[]>) => response.body)
            )
            .subscribe((res: IPaymentMethod[]) => (this.paymentmethods = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.profileService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfile[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfile[]>) => response.body)
            )
            .subscribe((res: IProfile[]) => (this.profiles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.shopDeviceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IShopDevice[]>) => mayBeOk.ok),
                map((response: HttpResponse<IShopDevice[]>) => response.body)
            )
            .subscribe((res: IShopDevice[]) => (this.shopdevices = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.sectionTableService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISectionTable[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISectionTable[]>) => response.body)
            )
            .subscribe((res: ISectionTable[]) => (this.sectiontables = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.orders.orderDate = this.orderDate != null ? moment(this.orderDate, DATE_TIME_FORMAT) : null;
        if (this.orders.id !== undefined) {
            this.subscribeToSaveResponse(this.ordersService.update(this.orders));
        } else {
            this.subscribeToSaveResponse(this.ordersService.create(this.orders));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrders>>) {
        result.subscribe((res: HttpResponse<IOrders>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPaymentMethodById(index: number, item: IPaymentMethod) {
        return item.id;
    }

    trackProfileById(index: number, item: IProfile) {
        return item.id;
    }

    trackShopDeviceById(index: number, item: IShopDevice) {
        return item.id;
    }

    trackSectionTableById(index: number, item: ISectionTable) {
        return item.id;
    }

    trackShopById(index: number, item: IShop) {
        return item.id;
    }
}
