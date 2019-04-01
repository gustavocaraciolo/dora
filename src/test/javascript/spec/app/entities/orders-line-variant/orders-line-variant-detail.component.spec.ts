/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineVariantDetailComponent } from 'app/entities/orders-line-variant/orders-line-variant-detail.component';
import { OrdersLineVariant } from 'app/shared/model/orders-line-variant.model';

describe('Component Tests', () => {
    describe('OrdersLineVariant Management Detail Component', () => {
        let comp: OrdersLineVariantDetailComponent;
        let fixture: ComponentFixture<OrdersLineVariantDetailComponent>;
        const route = ({ data: of({ ordersLineVariant: new OrdersLineVariant(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineVariantDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrdersLineVariantDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdersLineVariantDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ordersLineVariant).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
