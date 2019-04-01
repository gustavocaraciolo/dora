import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeTimesheet } from 'app/shared/model/employee-timesheet.model';

type EntityResponseType = HttpResponse<IEmployeeTimesheet>;
type EntityArrayResponseType = HttpResponse<IEmployeeTimesheet[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeTimesheetService {
    public resourceUrl = SERVER_API_URL + 'api/employee-timesheets';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/employee-timesheets';

    constructor(protected http: HttpClient) {}

    create(employeeTimesheet: IEmployeeTimesheet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employeeTimesheet);
        return this.http
            .post<IEmployeeTimesheet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(employeeTimesheet: IEmployeeTimesheet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employeeTimesheet);
        return this.http
            .put<IEmployeeTimesheet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEmployeeTimesheet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployeeTimesheet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployeeTimesheet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(employeeTimesheet: IEmployeeTimesheet): IEmployeeTimesheet {
        const copy: IEmployeeTimesheet = Object.assign({}, employeeTimesheet, {
            checkinTime:
                employeeTimesheet.checkinTime != null && employeeTimesheet.checkinTime.isValid()
                    ? employeeTimesheet.checkinTime.toJSON()
                    : null,
            checkOutTime:
                employeeTimesheet.checkOutTime != null && employeeTimesheet.checkOutTime.isValid()
                    ? employeeTimesheet.checkOutTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.checkinTime = res.body.checkinTime != null ? moment(res.body.checkinTime) : null;
            res.body.checkOutTime = res.body.checkOutTime != null ? moment(res.body.checkOutTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((employeeTimesheet: IEmployeeTimesheet) => {
                employeeTimesheet.checkinTime = employeeTimesheet.checkinTime != null ? moment(employeeTimesheet.checkinTime) : null;
                employeeTimesheet.checkOutTime = employeeTimesheet.checkOutTime != null ? moment(employeeTimesheet.checkOutTime) : null;
            });
        }
        return res;
    }
}
