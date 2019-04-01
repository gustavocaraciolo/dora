import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPaymentMethodConfig } from 'app/shared/model/payment-method-config.model';
import { PaymentMethodConfigService } from './payment-method-config.service';
import { IPaymentMethod } from 'app/shared/model/payment-method.model';
import { PaymentMethodService } from 'app/entities/payment-method';

@Component({
    selector: 'jhi-payment-method-config-update',
    templateUrl: './payment-method-config-update.component.html'
})
export class PaymentMethodConfigUpdateComponent implements OnInit {
    paymentMethodConfig: IPaymentMethodConfig;
    isSaving: boolean;

    paymentmethods: IPaymentMethod[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected paymentMethodConfigService: PaymentMethodConfigService,
        protected paymentMethodService: PaymentMethodService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ paymentMethodConfig }) => {
            this.paymentMethodConfig = paymentMethodConfig;
        });
        this.paymentMethodService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPaymentMethod[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPaymentMethod[]>) => response.body)
            )
            .subscribe((res: IPaymentMethod[]) => (this.paymentmethods = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.paymentMethodConfig.id !== undefined) {
            this.subscribeToSaveResponse(this.paymentMethodConfigService.update(this.paymentMethodConfig));
        } else {
            this.subscribeToSaveResponse(this.paymentMethodConfigService.create(this.paymentMethodConfig));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentMethodConfig>>) {
        result.subscribe((res: HttpResponse<IPaymentMethodConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
