/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ProductVariantService } from 'app/entities/product-variant/product-variant.service';
import { IProductVariant, ProductVariant } from 'app/shared/model/product-variant.model';

describe('Service Tests', () => {
    describe('ProductVariant Service', () => {
        let injector: TestBed;
        let service: ProductVariantService;
        let httpMock: HttpTestingController;
        let elemDefault: IProductVariant;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ProductVariantService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new ProductVariant(
                0,
                'AAAAAAA',
                'AAAAAAA',
                0,
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                0
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

            it('should create a ProductVariant', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new ProductVariant(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ProductVariant', async () => {
                const returnedFromService = Object.assign(
                    {
                        variantName: 'BBBBBB',
                        description: 'BBBBBB',
                        percentage: 1,
                        fullPhoto: 'BBBBBB',
                        fullPhotoUrl: 'BBBBBB',
                        thumbnailPhoto: 'BBBBBB',
                        thumbnailPhotoUrl: 'BBBBBB',
                        price: 1
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

            it('should return a list of ProductVariant', async () => {
                const returnedFromService = Object.assign(
                    {
                        variantName: 'BBBBBB',
                        description: 'BBBBBB',
                        percentage: 1,
                        fullPhoto: 'BBBBBB',
                        fullPhotoUrl: 'BBBBBB',
                        thumbnailPhoto: 'BBBBBB',
                        thumbnailPhotoUrl: 'BBBBBB',
                        price: 1
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

            it('should delete a ProductVariant', async () => {
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
