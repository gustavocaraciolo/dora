/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineExtraUpdateComponent } from 'app/entities/orders-line-extra/orders-line-extra-update.component';
import { OrdersLineExtraService } from 'app/entities/orders-line-extra/orders-line-extra.service';
import { OrdersLineExtra } from 'app/shared/model/orders-line-extra.model';

describe('Component Tests', () => {
    describe('OrdersLineExtra Management Update Component', () => {
        let comp: OrdersLineExtraUpdateComponent;
        let fixture: ComponentFixture<OrdersLineExtraUpdateComponent>;
        let service: OrdersLineExtraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineExtraUpdateComponent]
            })
                .overrideTemplate(OrdersLineExtraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdersLineExtraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdersLineExtraService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrdersLineExtra(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordersLineExtra = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrdersLineExtra();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordersLineExtra = entity;
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
