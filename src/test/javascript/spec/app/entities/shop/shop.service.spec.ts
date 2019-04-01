/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ShopService } from 'app/entities/shop/shop.service';
import { IShop, Shop, ShopAccountType } from 'app/shared/model/shop.model';

describe('Service Tests', () => {
    describe('Shop Service', () => {
        let injector: TestBed;
        let service: ShopService;
        let httpMock: HttpTestingController;
        let elemDefault: IShop;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ShopService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Shop(
                0,
                'AAAAAAA',
                ShopAccountType.TRIAL_ACCOUNT,
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                false,
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        approvalDate: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Shop', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        approvalDate: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        approvalDate: currentDate,
                        createdDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Shop(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Shop', async () => {
                const returnedFromService = Object.assign(
                    {
                        shopName: 'BBBBBB',
                        shopAccountType: 'BBBBBB',
                        approvalDate: currentDate.format(DATE_TIME_FORMAT),
                        address: 'BBBBBB',
                        email: 'BBBBBB',
                        description: 'BBBBBB',
                        note: 'BBBBBB',
                        landland: 'BBBBBB',
                        mobile: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        shopLogo: 'BBBBBB',
                        shopLogoUrl: 'BBBBBB',
                        active: true,
                        currency: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        approvalDate: currentDate,
                        createdDate: currentDate
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

            it('should return a list of Shop', async () => {
                const returnedFromService = Object.assign(
                    {
                        shopName: 'BBBBBB',
                        shopAccountType: 'BBBBBB',
                        approvalDate: currentDate.format(DATE_TIME_FORMAT),
                        address: 'BBBBBB',
                        email: 'BBBBBB',
                        description: 'BBBBBB',
                        note: 'BBBBBB',
                        landland: 'BBBBBB',
                        mobile: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        shopLogo: 'BBBBBB',
                        shopLogoUrl: 'BBBBBB',
                        active: true,
                        currency: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        approvalDate: currentDate,
                        createdDate: currentDate
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

            it('should delete a Shop', async () => {
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
