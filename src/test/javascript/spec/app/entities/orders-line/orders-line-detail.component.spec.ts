/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineDetailComponent } from 'app/entities/orders-line/orders-line-detail.component';
import { OrdersLine } from 'app/shared/model/orders-line.model';

describe('Component Tests', () => {
    describe('OrdersLine Management Detail Component', () => {
        let comp: OrdersLineDetailComponent;
        let fixture: ComponentFixture<OrdersLineDetailComponent>;
        const route = ({ data: of({ ordersLine: new OrdersLine(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrdersLineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdersLineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ordersLine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
