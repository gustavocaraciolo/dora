import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from './shop.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';

@Component({
    selector: 'jhi-shop-update',
    templateUrl: './shop-update.component.html'
})
export class ShopUpdateComponent implements OnInit {
    shop: IShop;
    isSaving: boolean;

    companies: ICompany[];

    profiles: IProfile[];
    approvalDate: string;
    createdDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected shopService: ShopService,
        protected companyService: CompanyService,
        protected profileService: ProfileService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shop }) => {
            this.shop = shop;
            this.approvalDate = this.shop.approvalDate != null ? this.shop.approvalDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.shop.createdDate != null ? this.shop.createdDate.format(DATE_TIME_FORMAT) : null;
        });
        this.companyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompany[]>) => response.body)
            )
            .subscribe((res: ICompany[]) => (this.companies = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.profileService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfile[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfile[]>) => response.body)
            )
            .subscribe((res: IProfile[]) => (this.profiles = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.dataUtils.clearInputImage(this.shop, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.shop.approvalDate = this.approvalDate != null ? moment(this.approvalDate, DATE_TIME_FORMAT) : null;
        this.shop.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.shop.id !== undefined) {
            this.subscribeToSaveResponse(this.shopService.update(this.shop));
        } else {
            this.subscribeToSaveResponse(this.shopService.create(this.shop));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IShop>>) {
        result.subscribe((res: HttpResponse<IShop>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }

    trackProfileById(index: number, item: IProfile) {
        return item.id;
    }
}
