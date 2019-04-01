import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IOrdersLineExtra } from 'app/shared/model/orders-line-extra.model';
import { OrdersLineExtraService } from './orders-line-extra.service';
import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';
import { OrdersLineVariantService } from 'app/entities/orders-line-variant';

@Component({
    selector: 'jhi-orders-line-extra-update',
    templateUrl: './orders-line-extra-update.component.html'
})
export class OrdersLineExtraUpdateComponent implements OnInit {
    ordersLineExtra: IOrdersLineExtra;
    isSaving: boolean;

    orderslinevariants: IOrdersLineVariant[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected ordersLineExtraService: OrdersLineExtraService,
        protected ordersLineVariantService: OrdersLineVariantService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ordersLineExtra }) => {
            this.ordersLineExtra = ordersLineExtra;
        });
        this.ordersLineVariantService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IOrdersLineVariant[]>) => mayBeOk.ok),
                map((response: HttpResponse<IOrdersLineVariant[]>) => response.body)
            )
            .subscribe(
                (res: IOrdersLineVariant[]) => (this.orderslinevariants = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.ordersLineExtra, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ordersLineExtra.id !== undefined) {
            this.subscribeToSaveResponse(this.ordersLineExtraService.update(this.ordersLineExtra));
        } else {
            this.subscribeToSaveResponse(this.ordersLineExtraService.create(this.ordersLineExtra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdersLineExtra>>) {
        result.subscribe((res: HttpResponse<IOrdersLineExtra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrdersLineVariantById(index: number, item: IOrdersLineVariant) {
        return item.id;
    }
}
