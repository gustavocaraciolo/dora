import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShopDevice } from 'app/shared/model/shop-device.model';

type EntityResponseType = HttpResponse<IShopDevice>;
type EntityArrayResponseType = HttpResponse<IShopDevice[]>;

@Injectable({ providedIn: 'root' })
export class ShopDeviceService {
    public resourceUrl = SERVER_API_URL + 'api/shop-devices';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/shop-devices';

    constructor(protected http: HttpClient) {}

    create(shopDevice: IShopDevice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(shopDevice);
        return this.http
            .post<IShopDevice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(shopDevice: IShopDevice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(shopDevice);
        return this.http
            .put<IShopDevice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IShopDevice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IShopDevice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IShopDevice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(shopDevice: IShopDevice): IShopDevice {
        const copy: IShopDevice = Object.assign({}, shopDevice, {
            registeredDate:
                shopDevice.registeredDate != null && shopDevice.registeredDate.isValid() ? shopDevice.registeredDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.registeredDate = res.body.registeredDate != null ? moment(res.body.registeredDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((shopDevice: IShopDevice) => {
                shopDevice.registeredDate = shopDevice.registeredDate != null ? moment(shopDevice.registeredDate) : null;
            });
        }
        return res;
    }
}
