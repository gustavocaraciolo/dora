import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployeeTimesheet } from 'app/shared/model/employee-timesheet.model';
import { EmployeeTimesheetService } from './employee-timesheet.service';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';

@Component({
    selector: 'jhi-employee-timesheet-update',
    templateUrl: './employee-timesheet-update.component.html'
})
export class EmployeeTimesheetUpdateComponent implements OnInit {
    employeeTimesheet: IEmployeeTimesheet;
    isSaving: boolean;

    profiles: IProfile[];

    shops: IShop[];
    checkinTime: string;
    checkOutTime: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected employeeTimesheetService: EmployeeTimesheetService,
        protected profileService: ProfileService,
        protected shopService: ShopService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employeeTimesheet }) => {
            this.employeeTimesheet = employeeTimesheet;
            this.checkinTime =
                this.employeeTimesheet.checkinTime != null ? this.employeeTimesheet.checkinTime.format(DATE_TIME_FORMAT) : null;
            this.checkOutTime =
                this.employeeTimesheet.checkOutTime != null ? this.employeeTimesheet.checkOutTime.format(DATE_TIME_FORMAT) : null;
        });
        this.profileService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfile[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfile[]>) => response.body)
            )
            .subscribe((res: IProfile[]) => (this.profiles = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.employeeTimesheet.checkinTime = this.checkinTime != null ? moment(this.checkinTime, DATE_TIME_FORMAT) : null;
        this.employeeTimesheet.checkOutTime = this.checkOutTime != null ? moment(this.checkOutTime, DATE_TIME_FORMAT) : null;
        if (this.employeeTimesheet.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeTimesheetService.update(this.employeeTimesheet));
        } else {
            this.subscribeToSaveResponse(this.employeeTimesheetService.create(this.employeeTimesheet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeTimesheet>>) {
        result.subscribe((res: HttpResponse<IEmployeeTimesheet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfileById(index: number, item: IProfile) {
        return item.id;
    }

    trackShopById(index: number, item: IShop) {
        return item.id;
    }
}
