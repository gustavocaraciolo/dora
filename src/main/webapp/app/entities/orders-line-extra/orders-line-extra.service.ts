import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdersLineExtra } from 'app/shared/model/orders-line-extra.model';

type EntityResponseType = HttpResponse<IOrdersLineExtra>;
type EntityArrayResponseType = HttpResponse<IOrdersLineExtra[]>;

@Injectable({ providedIn: 'root' })
export class OrdersLineExtraService {
    public resourceUrl = SERVER_API_URL + 'api/orders-line-extras';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/orders-line-extras';

    constructor(protected http: HttpClient) {}

    create(ordersLineExtra: IOrdersLineExtra): Observable<EntityResponseType> {
        return this.http.post<IOrdersLineExtra>(this.resourceUrl, ordersLineExtra, { observe: 'response' });
    }

    update(ordersLineExtra: IOrdersLineExtra): Observable<EntityResponseType> {
        return this.http.put<IOrdersLineExtra>(this.resourceUrl, ordersLineExtra, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrdersLineExtra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdersLineExtra[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdersLineExtra[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
