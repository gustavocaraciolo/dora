/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineExtraDetailComponent } from 'app/entities/orders-line-extra/orders-line-extra-detail.component';
import { OrdersLineExtra } from 'app/shared/model/orders-line-extra.model';

describe('Component Tests', () => {
    describe('OrdersLineExtra Management Detail Component', () => {
        let comp: OrdersLineExtraDetailComponent;
        let fixture: ComponentFixture<OrdersLineExtraDetailComponent>;
        const route = ({ data: of({ ordersLineExtra: new OrdersLineExtra(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineExtraDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrdersLineExtraDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdersLineExtraDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ordersLineExtra).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
