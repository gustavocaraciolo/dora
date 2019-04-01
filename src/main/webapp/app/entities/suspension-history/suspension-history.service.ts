import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISuspensionHistory } from 'app/shared/model/suspension-history.model';

type EntityResponseType = HttpResponse<ISuspensionHistory>;
type EntityArrayResponseType = HttpResponse<ISuspensionHistory[]>;

@Injectable({ providedIn: 'root' })
export class SuspensionHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/suspension-histories';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/suspension-histories';

    constructor(protected http: HttpClient) {}

    create(suspensionHistory: ISuspensionHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(suspensionHistory);
        return this.http
            .post<ISuspensionHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(suspensionHistory: ISuspensionHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(suspensionHistory);
        return this.http
            .put<ISuspensionHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISuspensionHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISuspensionHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISuspensionHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(suspensionHistory: ISuspensionHistory): ISuspensionHistory {
        const copy: ISuspensionHistory = Object.assign({}, suspensionHistory, {
            suspendedDate:
                suspensionHistory.suspendedDate != null && suspensionHistory.suspendedDate.isValid()
                    ? suspensionHistory.suspendedDate.toJSON()
                    : null,
            unsuspensionDate:
                suspensionHistory.unsuspensionDate != null && suspensionHistory.unsuspensionDate.isValid()
                    ? suspensionHistory.unsuspensionDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.suspendedDate = res.body.suspendedDate != null ? moment(res.body.suspendedDate) : null;
            res.body.unsuspensionDate = res.body.unsuspensionDate != null ? moment(res.body.unsuspensionDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((suspensionHistory: ISuspensionHistory) => {
                suspensionHistory.suspendedDate = suspensionHistory.suspendedDate != null ? moment(suspensionHistory.suspendedDate) : null;
                suspensionHistory.unsuspensionDate =
                    suspensionHistory.unsuspensionDate != null ? moment(suspensionHistory.unsuspensionDate) : null;
            });
        }
        return res;
    }
}
