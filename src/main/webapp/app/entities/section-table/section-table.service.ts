import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISectionTable } from 'app/shared/model/section-table.model';

type EntityResponseType = HttpResponse<ISectionTable>;
type EntityArrayResponseType = HttpResponse<ISectionTable[]>;

@Injectable({ providedIn: 'root' })
export class SectionTableService {
    public resourceUrl = SERVER_API_URL + 'api/section-tables';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/section-tables';

    constructor(protected http: HttpClient) {}

    create(sectionTable: ISectionTable): Observable<EntityResponseType> {
        return this.http.post<ISectionTable>(this.resourceUrl, sectionTable, { observe: 'response' });
    }

    update(sectionTable: ISectionTable): Observable<EntityResponseType> {
        return this.http.put<ISectionTable>(this.resourceUrl, sectionTable, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISectionTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISectionTable[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISectionTable[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
