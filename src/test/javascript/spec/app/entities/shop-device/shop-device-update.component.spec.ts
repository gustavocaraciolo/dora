/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ShopDeviceUpdateComponent } from 'app/entities/shop-device/shop-device-update.component';
import { ShopDeviceService } from 'app/entities/shop-device/shop-device.service';
import { ShopDevice } from 'app/shared/model/shop-device.model';

describe('Component Tests', () => {
    describe('ShopDevice Management Update Component', () => {
        let comp: ShopDeviceUpdateComponent;
        let fixture: ComponentFixture<ShopDeviceUpdateComponent>;
        let service: ShopDeviceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopDeviceUpdateComponent]
            })
                .overrideTemplate(ShopDeviceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShopDeviceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopDeviceService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopDevice(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopDevice = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopDevice();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopDevice = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
