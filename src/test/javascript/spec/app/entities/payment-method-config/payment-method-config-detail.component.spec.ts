/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { PaymentMethodConfigDetailComponent } from 'app/entities/payment-method-config/payment-method-config-detail.component';
import { PaymentMethodConfig } from 'app/shared/model/payment-method-config.model';

describe('Component Tests', () => {
    describe('PaymentMethodConfig Management Detail Component', () => {
        let comp: PaymentMethodConfigDetailComponent;
        let fixture: ComponentFixture<PaymentMethodConfigDetailComponent>;
        const route = ({ data: of({ paymentMethodConfig: new PaymentMethodConfig(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [PaymentMethodConfigDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PaymentMethodConfigDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaymentMethodConfigDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.paymentMethodConfig).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
