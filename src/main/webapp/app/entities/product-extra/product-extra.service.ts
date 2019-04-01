import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductExtra } from 'app/shared/model/product-extra.model';

type EntityResponseType = HttpResponse<IProductExtra>;
type EntityArrayResponseType = HttpResponse<IProductExtra[]>;

@Injectable({ providedIn: 'root' })
export class ProductExtraService {
    public resourceUrl = SERVER_API_URL + 'api/product-extras';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/product-extras';

    constructor(protected http: HttpClient) {}

    create(productExtra: IProductExtra): Observable<EntityResponseType> {
        return this.http.post<IProductExtra>(this.resourceUrl, productExtra, { observe: 'response' });
    }

    update(productExtra: IProductExtra): Observable<EntityResponseType> {
        return this.http.put<IProductExtra>(this.resourceUrl, productExtra, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductExtra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductExtra[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductExtra[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
