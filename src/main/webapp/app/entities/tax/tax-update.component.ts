import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITax } from 'app/shared/model/tax.model';
import { TaxService } from './tax.service';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';

@Component({
    selector: 'jhi-tax-update',
    templateUrl: './tax-update.component.html'
})
export class TaxUpdateComponent implements OnInit {
    tax: ITax;
    isSaving: boolean;

    shops: IShop[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taxService: TaxService,
        protected shopService: ShopService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tax }) => {
            this.tax = tax;
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
        if (this.tax.id !== undefined) {
            this.subscribeToSaveResponse(this.taxService.update(this.tax));
        } else {
            this.subscribeToSaveResponse(this.taxService.create(this.tax));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITax>>) {
        result.subscribe((res: HttpResponse<ITax>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
