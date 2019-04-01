/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmployeeTimesheetService } from 'app/entities/employee-timesheet/employee-timesheet.service';
import { IEmployeeTimesheet, EmployeeTimesheet } from 'app/shared/model/employee-timesheet.model';

describe('Service Tests', () => {
    describe('EmployeeTimesheet Service', () => {
        let injector: TestBed;
        let service: EmployeeTimesheetService;
        let httpMock: HttpTestingController;
        let elemDefault: IEmployeeTimesheet;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EmployeeTimesheetService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new EmployeeTimesheet(0, currentDate, currentDate, 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        checkinTime: currentDate.format(DATE_TIME_FORMAT),
                        checkOutTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a EmployeeTimesheet', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        checkinTime: currentDate.format(DATE_TIME_FORMAT),
                        checkOutTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        checkinTime: currentDate,
                        checkOutTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new EmployeeTimesheet(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a EmployeeTimesheet', async () => {
                const returnedFromService = Object.assign(
                    {
                        checkinTime: currentDate.format(DATE_TIME_FORMAT),
                        checkOutTime: currentDate.format(DATE_TIME_FORMAT),
                        regularHoursWorked: 1,
                        overTimeHoursWorked: 1,
                        pay: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        checkinTime: currentDate,
                        checkOutTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of EmployeeTimesheet', async () => {
                const returnedFromService = Object.assign(
                    {
                        checkinTime: currentDate.format(DATE_TIME_FORMAT),
                        checkOutTime: currentDate.format(DATE_TIME_FORMAT),
                        regularHoursWorked: 1,
                        overTimeHoursWorked: 1,
                        pay: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        checkinTime: currentDate,
                        checkOutTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a EmployeeTimesheet', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
