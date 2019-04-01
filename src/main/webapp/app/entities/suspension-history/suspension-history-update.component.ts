import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISuspensionHistory } from 'app/shared/model/suspension-history.model';
import { SuspensionHistoryService } from './suspension-history.service';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';

@Component({
    selector: 'jhi-suspension-history-update',
    templateUrl: './suspension-history-update.component.html'
})
export class SuspensionHistoryUpdateComponent implements OnInit {
    suspensionHistory: ISuspensionHistory;
    isSaving: boolean;

    profiles: IProfile[];
    suspendedDate: string;
    unsuspensionDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected suspensionHistoryService: SuspensionHistoryService,
        protected profileService: ProfileService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ suspensionHistory }) => {
            this.suspensionHistory = suspensionHistory;
            this.suspendedDate =
                this.suspensionHistory.suspendedDate != null ? this.suspensionHistory.suspendedDate.format(DATE_TIME_FORMAT) : null;
            this.unsuspensionDate =
                this.suspensionHistory.unsuspensionDate != null ? this.suspensionHistory.unsuspensionDate.format(DATE_TIME_FORMAT) : null;
        });
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
        this.suspensionHistory.suspendedDate = this.suspendedDate != null ? moment(this.suspendedDate, DATE_TIME_FORMAT) : null;
        this.suspensionHistory.unsuspensionDate = this.unsuspensionDate != null ? moment(this.unsuspensionDate, DATE_TIME_FORMAT) : null;
        if (this.suspensionHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.suspensionHistoryService.update(this.suspensionHistory));
        } else {
            this.subscribeToSaveResponse(this.suspensionHistoryService.create(this.suspensionHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuspensionHistory>>) {
        result.subscribe((res: HttpResponse<ISuspensionHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
