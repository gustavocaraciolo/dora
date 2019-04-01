import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISystemEventsHistory } from 'app/shared/model/system-events-history.model';
import { SystemEventsHistoryService } from './system-events-history.service';
import { IProfile } from 'app/shared/model/profile.model';
import { ProfileService } from 'app/entities/profile';

@Component({
    selector: 'jhi-system-events-history-update',
    templateUrl: './system-events-history-update.component.html'
})
export class SystemEventsHistoryUpdateComponent implements OnInit {
    systemEventsHistory: ISystemEventsHistory;
    isSaving: boolean;

    profiles: IProfile[];
    eventDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected systemEventsHistoryService: SystemEventsHistoryService,
        protected profileService: ProfileService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ systemEventsHistory }) => {
            this.systemEventsHistory = systemEventsHistory;
            this.eventDate =
                this.systemEventsHistory.eventDate != null ? this.systemEventsHistory.eventDate.format(DATE_TIME_FORMAT) : null;
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
        this.systemEventsHistory.eventDate = this.eventDate != null ? moment(this.eventDate, DATE_TIME_FORMAT) : null;
        if (this.systemEventsHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.systemEventsHistoryService.update(this.systemEventsHistory));
        } else {
            this.subscribeToSaveResponse(this.systemEventsHistoryService.create(this.systemEventsHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemEventsHistory>>) {
        result.subscribe((res: HttpResponse<ISystemEventsHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
