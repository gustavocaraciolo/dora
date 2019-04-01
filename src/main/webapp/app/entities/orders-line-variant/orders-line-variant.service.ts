import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';

type EntityResponseType = HttpResponse<IOrdersLineVariant>;
type EntityArrayResponseType = HttpResponse<IOrdersLineVariant[]>;

@Injectable({ providedIn: 'root' })
export class OrdersLineVariantService {
    public resourceUrl = SERVER_API_URL + 'api/orders-line-variants';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/orders-line-variants';

    constructor(protected http: HttpClient) {}

    create(ordersLineVariant: IOrdersLineVariant): Observable<EntityResponseType> {
        return this.http.post<IOrdersLineVariant>(this.resourceUrl, ordersLineVariant, { observe: 'response' });
    }

    update(ordersLineVariant: IOrdersLineVariant): Observable<EntityResponseType> {
        return this.http.put<IOrdersLineVariant>(this.resourceUrl, ordersLineVariant, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrdersLineVariant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdersLineVariant[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdersLineVariant[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
