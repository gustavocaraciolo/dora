/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineUpdateComponent } from 'app/entities/orders-line/orders-line-update.component';
import { OrdersLineService } from 'app/entities/orders-line/orders-line.service';
import { OrdersLine } from 'app/shared/model/orders-line.model';

describe('Component Tests', () => {
    describe('OrdersLine Management Update Component', () => {
        let comp: OrdersLineUpdateComponent;
        let fixture: ComponentFixture<OrdersLineUpdateComponent>;
        let service: OrdersLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineUpdateComponent]
            })
                .overrideTemplate(OrdersLineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdersLineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdersLineService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrdersLine(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordersLine = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrdersLine();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordersLine = entity;
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
