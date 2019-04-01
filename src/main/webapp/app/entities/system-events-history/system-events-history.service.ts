import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISystemEventsHistory } from 'app/shared/model/system-events-history.model';

type EntityResponseType = HttpResponse<ISystemEventsHistory>;
type EntityArrayResponseType = HttpResponse<ISystemEventsHistory[]>;

@Injectable({ providedIn: 'root' })
export class SystemEventsHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/system-events-histories';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/system-events-histories';

    constructor(protected http: HttpClient) {}

    create(systemEventsHistory: ISystemEventsHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(systemEventsHistory);
        return this.http
            .post<ISystemEventsHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(systemEventsHistory: ISystemEventsHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(systemEventsHistory);
        return this.http
            .put<ISystemEventsHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISystemEventsHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISystemEventsHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISystemEventsHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(systemEventsHistory: ISystemEventsHistory): ISystemEventsHistory {
        const copy: ISystemEventsHistory = Object.assign({}, systemEventsHistory, {
            eventDate:
                systemEventsHistory.eventDate != null && systemEventsHistory.eventDate.isValid()
                    ? systemEventsHistory.eventDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.eventDate = res.body.eventDate != null ? moment(res.body.eventDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((systemEventsHistory: ISystemEventsHistory) => {
                systemEventsHistory.eventDate = systemEventsHistory.eventDate != null ? moment(systemEventsHistory.eventDate) : null;
            });
        }
        return res;
    }
}
