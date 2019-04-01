import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShopSection } from 'app/shared/model/shop-section.model';

type EntityResponseType = HttpResponse<IShopSection>;
type EntityArrayResponseType = HttpResponse<IShopSection[]>;

@Injectable({ providedIn: 'root' })
export class ShopSectionService {
    public resourceUrl = SERVER_API_URL + 'api/shop-sections';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/shop-sections';

    constructor(protected http: HttpClient) {}

    create(shopSection: IShopSection): Observable<EntityResponseType> {
        return this.http.post<IShopSection>(this.resourceUrl, shopSection, { observe: 'response' });
    }

    update(shopSection: IShopSection): Observable<EntityResponseType> {
        return this.http.put<IShopSection>(this.resourceUrl, shopSection, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IShopSection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IShopSection[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IShopSection[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
