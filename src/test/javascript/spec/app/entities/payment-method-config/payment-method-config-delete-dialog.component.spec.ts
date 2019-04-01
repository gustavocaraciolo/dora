/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { PaymentMethodConfigDeleteDialogComponent } from 'app/entities/payment-method-config/payment-method-config-delete-dialog.component';
import { PaymentMethodConfigService } from 'app/entities/payment-method-config/payment-method-config.service';

describe('Component Tests', () => {
    describe('PaymentMethodConfig Management Delete Component', () => {
        let comp: PaymentMethodConfigDeleteDialogComponent;
        let fixture: ComponentFixture<PaymentMethodConfigDeleteDialogComponent>;
        let service: PaymentMethodConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [PaymentMethodConfigDeleteDialogComponent]
            })
                .overrideTemplate(PaymentMethodConfigDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaymentMethodConfigDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMethodConfigService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
