/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineExtraDeleteDialogComponent } from 'app/entities/orders-line-extra/orders-line-extra-delete-dialog.component';
import { OrdersLineExtraService } from 'app/entities/orders-line-extra/orders-line-extra.service';

describe('Component Tests', () => {
    describe('OrdersLineExtra Management Delete Component', () => {
        let comp: OrdersLineExtraDeleteDialogComponent;
        let fixture: ComponentFixture<OrdersLineExtraDeleteDialogComponent>;
        let service: OrdersLineExtraService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineExtraDeleteDialogComponent]
            })
                .overrideTemplate(OrdersLineExtraDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdersLineExtraDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdersLineExtraService);
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
