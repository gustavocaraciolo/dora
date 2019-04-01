/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineVariantDeleteDialogComponent } from 'app/entities/orders-line-variant/orders-line-variant-delete-dialog.component';
import { OrdersLineVariantService } from 'app/entities/orders-line-variant/orders-line-variant.service';

describe('Component Tests', () => {
    describe('OrdersLineVariant Management Delete Component', () => {
        let comp: OrdersLineVariantDeleteDialogComponent;
        let fixture: ComponentFixture<OrdersLineVariantDeleteDialogComponent>;
        let service: OrdersLineVariantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineVariantDeleteDialogComponent]
            })
                .overrideTemplate(OrdersLineVariantDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdersLineVariantDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdersLineVariantService);
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
