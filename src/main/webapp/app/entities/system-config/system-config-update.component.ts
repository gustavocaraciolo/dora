import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISystemConfig } from 'app/shared/model/system-config.model';
import { SystemConfigService } from './system-config.service';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';

@Component({
    selector: 'jhi-system-config-update',
    templateUrl: './system-config-update.component.html'
})
export class SystemConfigUpdateComponent implements OnInit {
    systemConfig: ISystemConfig;
    isSaving: boolean;

    shops: IShop[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected systemConfigService: SystemConfigService,
        protected shopService: ShopService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ systemConfig }) => {
            this.systemConfig = systemConfig;
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
        if (this.systemConfig.id !== undefined) {
            this.subscribeToSaveResponse(this.systemConfigService.update(this.systemConfig));
        } else {
            this.subscribeToSaveResponse(this.systemConfigService.create(this.systemConfig));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemConfig>>) {
        result.subscribe((res: HttpResponse<ISystemConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
