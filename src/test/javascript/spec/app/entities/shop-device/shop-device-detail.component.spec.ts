/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ShopDeviceDetailComponent } from 'app/entities/shop-device/shop-device-detail.component';
import { ShopDevice } from 'app/shared/model/shop-device.model';

describe('Component Tests', () => {
    describe('ShopDevice Management Detail Component', () => {
        let comp: ShopDeviceDetailComponent;
        let fixture: ComponentFixture<ShopDeviceDetailComponent>;
        const route = ({ data: of({ shopDevice: new ShopDevice(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopDeviceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShopDeviceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopDeviceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shopDevice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
