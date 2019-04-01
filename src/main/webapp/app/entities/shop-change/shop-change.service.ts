import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShopChange } from 'app/shared/model/shop-change.model';

type EntityResponseType = HttpResponse<IShopChange>;
type EntityArrayResponseType = HttpResponse<IShopChange[]>;

@Injectable({ providedIn: 'root' })
export class ShopChangeService {
    public resourceUrl = SERVER_API_URL + 'api/shop-changes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/shop-changes';

    constructor(protected http: HttpClient) {}

    create(shopChange: IShopChange): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(shopChange);
        return this.http
            .post<IShopChange>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(shopChange: IShopChange): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(shopChange);
        return this.http
            .put<IShopChange>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IShopChange>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IShopChange[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IShopChange[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(shopChange: IShopChange): IShopChange {
        const copy: IShopChange = Object.assign({}, shopChange, {
            changeDate: shopChange.changeDate != null && shopChange.changeDate.isValid() ? shopChange.changeDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.changeDate = res.body.changeDate != null ? moment(res.body.changeDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((shopChange: IShopChange) => {
                shopChange.changeDate = shopChange.changeDate != null ? moment(shopChange.changeDate) : null;
            });
        }
        return res;
    }
}
