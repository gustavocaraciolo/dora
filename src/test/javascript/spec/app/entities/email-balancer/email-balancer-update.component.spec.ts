/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { EmailBalancerUpdateComponent } from 'app/entities/email-balancer/email-balancer-update.component';
import { EmailBalancerService } from 'app/entities/email-balancer/email-balancer.service';
import { EmailBalancer } from 'app/shared/model/email-balancer.model';

describe('Component Tests', () => {
    describe('EmailBalancer Management Update Component', () => {
        let comp: EmailBalancerUpdateComponent;
        let fixture: ComponentFixture<EmailBalancerUpdateComponent>;
        let service: EmailBalancerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [EmailBalancerUpdateComponent]
            })
                .overrideTemplate(EmailBalancerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmailBalancerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailBalancerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new EmailBalancer(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.emailBalancer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new EmailBalancer();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.emailBalancer = entity;
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
