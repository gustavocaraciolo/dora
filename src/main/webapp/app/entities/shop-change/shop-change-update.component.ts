import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IShopChange } from 'app/shared/model/shop-change.model';
import { ShopChangeService } from './shop-change.service';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';

@Component({
    selector: 'jhi-shop-change-update',
    templateUrl: './shop-change-update.component.html'
})
export class ShopChangeUpdateComponent implements OnInit {
    shopChange: IShopChange;
    isSaving: boolean;

    shops: IShop[];

    profiles: IProfile[];
    changeDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected shopChangeService: ShopChangeService,
        protected shopService: ShopService,
        protected profileService: ProfileService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shopChange }) => {
            this.shopChange = shopChange;
            this.changeDate = this.shopChange.changeDate != null ? this.shopChange.changeDate.format(DATE_TIME_FORMAT) : null;
        });
        this.shopService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IShop[]>) => mayBeOk.ok),
                map((response: HttpResponse<IShop[]>) => response.body)
            )
            .subscribe((res: IShop[]) => (this.shops = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.profileService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfile[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfile[]>) => response.body)
            )
            .subscribe((res: IProfile[]) => (this.profiles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.shopChange.changeDate = this.changeDate != null ? moment(this.changeDate, DATE_TIME_FORMAT) : null;
        if (this.shopChange.id !== undefined) {
            this.subscribeToSaveResponse(this.shopChangeService.update(this.shopChange));
        } else {
            this.subscribeToSaveResponse(this.shopChangeService.create(this.shopChange));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopChange>>) {
        result.subscribe((res: HttpResponse<IShopChange>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfileById(index: number, item: IProfile) {
        return item.id;
    }
}
