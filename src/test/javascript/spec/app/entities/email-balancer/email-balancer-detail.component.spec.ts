/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { EmailBalancerDetailComponent } from 'app/entities/email-balancer/email-balancer-detail.component';
import { EmailBalancer } from 'app/shared/model/email-balancer.model';

describe('Component Tests', () => {
    describe('EmailBalancer Management Detail Component', () => {
        let comp: EmailBalancerDetailComponent;
        let fixture: ComponentFixture<EmailBalancerDetailComponent>;
        const route = ({ data: of({ emailBalancer: new EmailBalancer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [EmailBalancerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmailBalancerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmailBalancerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.emailBalancer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
