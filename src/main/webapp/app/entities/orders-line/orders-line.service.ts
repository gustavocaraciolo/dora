import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdersLine } from 'app/shared/model/orders-line.model';

type EntityResponseType = HttpResponse<IOrdersLine>;
type EntityArrayResponseType = HttpResponse<IOrdersLine[]>;

@Injectable({ providedIn: 'root' })
export class OrdersLineService {
    public resourceUrl = SERVER_API_URL + 'api/orders-lines';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/orders-lines';

    constructor(protected http: HttpClient) {}

    create(ordersLine: IOrdersLine): Observable<EntityResponseType> {
        return this.http.post<IOrdersLine>(this.resourceUrl, ordersLine, { observe: 'response' });
    }

    update(ordersLine: IOrdersLine): Observable<EntityResponseType> {
        return this.http.put<IOrdersLine>(this.resourceUrl, ordersLine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrdersLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdersLine[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdersLine[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
