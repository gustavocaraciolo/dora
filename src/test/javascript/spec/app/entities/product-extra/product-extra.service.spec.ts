/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ProductExtraService } from 'app/entities/product-extra/product-extra.service';
import { IProductExtra, ProductExtra } from 'app/shared/model/product-extra.model';

describe('Service Tests', () => {
    describe('ProductExtra Service', () => {
        let injector: TestBed;
        let service: ProductExtraService;
        let httpMock: HttpTestingController;
        let elemDefault: IProductExtra;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ProductExtraService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new ProductExtra(
                0,
                'AAAAAAA',
                'AAAAAAA',
                0,
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                'image/png',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ProductExtra', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new ProductExtra(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ProductExtra', async () => {
                const returnedFromService = Object.assign(
                    {
                        extraName: 'BBBBBB',
                        description: 'BBBBBB',
                        extraValue: 1,
                        fullPhoto: 'BBBBBB',
                        fullPhotoUrl: 'BBBBBB',
                        thumbnailPhoto: 'BBBBBB',
                        thumbnailPhotoUrl: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ProductExtra', async () => {
                const returnedFromService = Object.assign(
                    {
                        extraName: 'BBBBBB',
                        description: 'BBBBBB',
                        extraValue: 1,
                        fullPhoto: 'BBBBBB',
                        fullPhotoUrl: 'BBBBBB',
                        thumbnailPhoto: 'BBBBBB',
                        thumbnailPhotoUrl: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
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

            it('should delete a ProductExtra', async () => {
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
