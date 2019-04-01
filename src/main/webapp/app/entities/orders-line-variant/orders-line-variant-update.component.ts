import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';
import { OrdersLineVariantService } from './orders-line-variant.service';
import { IOrdersLine } from 'app/shared/model/orders-line.model';
import { OrdersLineService } from 'app/entities/orders-line';

@Component({
    selector: 'jhi-orders-line-variant-update',
    templateUrl: './orders-line-variant-update.component.html'
})
export class OrdersLineVariantUpdateComponent implements OnInit {
    ordersLineVariant: IOrdersLineVariant;
    isSaving: boolean;

    orderslines: IOrdersLine[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected ordersLineVariantService: OrdersLineVariantService,
        protected ordersLineService: OrdersLineService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ordersLineVariant }) => {
            this.ordersLineVariant = ordersLineVariant;
        });
        this.ordersLineService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IOrdersLine[]>) => mayBeOk.ok),
                map((response: HttpResponse<IOrdersLine[]>) => response.body)
            )
            .subscribe((res: IOrdersLine[]) => (this.orderslines = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.dataUtils.clearInputImage(this.ordersLineVariant, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ordersLineVariant.id !== undefined) {
            this.subscribeToSaveResponse(this.ordersLineVariantService.update(this.ordersLineVariant));
        } else {
            this.subscribeToSaveResponse(this.ordersLineVariantService.create(this.ordersLineVariant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdersLineVariant>>) {
        result.subscribe((res: HttpResponse<IOrdersLineVariant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrdersLineById(index: number, item: IOrdersLine) {
        return item.id;
    }
}
