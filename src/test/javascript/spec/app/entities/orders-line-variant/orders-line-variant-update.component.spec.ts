/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineVariantUpdateComponent } from 'app/entities/orders-line-variant/orders-line-variant-update.component';
import { OrdersLineVariantService } from 'app/entities/orders-line-variant/orders-line-variant.service';
import { OrdersLineVariant } from 'app/shared/model/orders-line-variant.model';

describe('Component Tests', () => {
    describe('OrdersLineVariant Management Update Component', () => {
        let comp: OrdersLineVariantUpdateComponent;
        let fixture: ComponentFixture<OrdersLineVariantUpdateComponent>;
        let service: OrdersLineVariantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineVariantUpdateComponent]
            })
                .overrideTemplate(OrdersLineVariantUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdersLineVariantUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdersLineVariantService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrdersLineVariant(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordersLineVariant = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrdersLineVariant();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordersLineVariant = entity;
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
