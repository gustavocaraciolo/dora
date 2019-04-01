import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfile } from 'app/shared/model/profile.model';

type EntityResponseType = HttpResponse<IProfile>;
type EntityArrayResponseType = HttpResponse<IProfile[]>;

@Injectable({ providedIn: 'root' })
export class ProfileService {
    public resourceUrl = SERVER_API_URL + 'api/profiles';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/profiles';

    constructor(protected http: HttpClient) {}

    create(profile: IProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(profile);
        return this.http
            .post<IProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(profile: IProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(profile);
        return this.http
            .put<IProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProfile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProfile[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(profile: IProfile): IProfile {
        const copy: IProfile = Object.assign({}, profile, {
            dateOfBirth: profile.dateOfBirth != null && profile.dateOfBirth.isValid() ? profile.dateOfBirth.format(DATE_FORMAT) : null,
            registerationDate:
                profile.registerationDate != null && profile.registerationDate.isValid() ? profile.registerationDate.toJSON() : null,
            lastAccess: profile.lastAccess != null && profile.lastAccess.isValid() ? profile.lastAccess.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateOfBirth = res.body.dateOfBirth != null ? moment(res.body.dateOfBirth) : null;
            res.body.registerationDate = res.body.registerationDate != null ? moment(res.body.registerationDate) : null;
            res.body.lastAccess = res.body.lastAccess != null ? moment(res.body.lastAccess) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((profile: IProfile) => {
                profile.dateOfBirth = profile.dateOfBirth != null ? moment(profile.dateOfBirth) : null;
                profile.registerationDate = profile.registerationDate != null ? moment(profile.registerationDate) : null;
                profile.lastAccess = profile.lastAccess != null ? moment(profile.lastAccess) : null;
            });
        }
        return res;
    }
}
