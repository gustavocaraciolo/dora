/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { OrdersLineDeleteDialogComponent } from 'app/entities/orders-line/orders-line-delete-dialog.component';
import { OrdersLineService } from 'app/entities/orders-line/orders-line.service';

describe('Component Tests', () => {
    describe('OrdersLine Management Delete Component', () => {
        let comp: OrdersLineDeleteDialogComponent;
        let fixture: ComponentFixture<OrdersLineDeleteDialogComponent>;
        let service: OrdersLineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [OrdersLineDeleteDialogComponent]
            })
                .overrideTemplate(OrdersLineDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdersLineDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdersLineService);
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
