import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmailBalancer } from 'app/shared/model/email-balancer.model';

type EntityResponseType = HttpResponse<IEmailBalancer>;
type EntityArrayResponseType = HttpResponse<IEmailBalancer[]>;

@Injectable({ providedIn: 'root' })
export class EmailBalancerService {
    public resourceUrl = SERVER_API_URL + 'api/email-balancers';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/email-balancers';

    constructor(protected http: HttpClient) {}

    create(emailBalancer: IEmailBalancer): Observable<EntityResponseType> {
        return this.http.post<IEmailBalancer>(this.resourceUrl, emailBalancer, { observe: 'response' });
    }

    update(emailBalancer: IEmailBalancer): Observable<EntityResponseType> {
        return this.http.put<IEmailBalancer>(this.resourceUrl, emailBalancer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmailBalancer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmailBalancer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmailBalancer[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
