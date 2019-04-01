/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProfileService } from 'app/entities/profile/profile.service';
import { IProfile, Profile, ProfileType, Gender, ProfileStatus } from 'app/shared/model/profile.model';

describe('Service Tests', () => {
    describe('Profile Service', () => {
        let injector: TestBed;
        let service: ProfileService;
        let httpMock: HttpTestingController;
        let elemDefault: IProfile;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ProfileService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Profile(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                ProfileType.SYSTEM_MANAGER,
                currentDate,
                Gender.MALE,
                currentDate,
                currentDate,
                ProfileStatus.ACTIVE,
                'AAAAAAA',
                'AAAAAAA',
                0,
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                false,
                0
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        registerationDate: currentDate.format(DATE_TIME_FORMAT),
                        lastAccess: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Profile', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        registerationDate: currentDate.format(DATE_TIME_FORMAT),
                        lastAccess: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        registerationDate: currentDate,
                        lastAccess: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Profile(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Profile', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        email: 'BBBBBB',
                        userType: 'BBBBBB',
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        gender: 'BBBBBB',
                        registerationDate: currentDate.format(DATE_TIME_FORMAT),
                        lastAccess: currentDate.format(DATE_TIME_FORMAT),
                        profileStatus: 'BBBBBB',
                        telephone: 'BBBBBB',
                        mobile: 'BBBBBB',
                        hourlyPayRate: 1,
                        thumbnailPhoto: 'BBBBBB',
                        thumbnailPhotoUrl: 'BBBBBB',
                        fullPhoto: 'BBBBBB',
                        fullPhotoUrl: 'BBBBBB',
                        active: true,
                        shopChangeId: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        registerationDate: currentDate,
                        lastAccess: currentDate
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

            it('should return a list of Profile', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        email: 'BBBBBB',
                        userType: 'BBBBBB',
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        gender: 'BBBBBB',
                        registerationDate: currentDate.format(DATE_TIME_FORMAT),
                        lastAccess: currentDate.format(DATE_TIME_FORMAT),
                        profileStatus: 'BBBBBB',
                        telephone: 'BBBBBB',
                        mobile: 'BBBBBB',
                        hourlyPayRate: 1,
                        thumbnailPhoto: 'BBBBBB',
                        thumbnailPhotoUrl: 'BBBBBB',
                        fullPhoto: 'BBBBBB',
                        fullPhotoUrl: 'BBBBBB',
                        active: true,
                        shopChangeId: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        registerationDate: currentDate,
                        lastAccess: currentDate
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

            it('should delete a Profile', async () => {
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
