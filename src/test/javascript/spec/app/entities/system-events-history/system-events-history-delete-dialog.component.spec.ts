/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { SystemEventsHistoryDeleteDialogComponent } from 'app/entities/system-events-history/system-events-history-delete-dialog.component';
import { SystemEventsHistoryService } from 'app/entities/system-events-history/system-events-history.service';

describe('Component Tests', () => {
    describe('SystemEventsHistory Management Delete Component', () => {
        let comp: SystemEventsHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<SystemEventsHistoryDeleteDialogComponent>;
        let service: SystemEventsHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SystemEventsHistoryDeleteDialogComponent]
            })
                .overrideTemplate(SystemEventsHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SystemEventsHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SystemEventsHistoryService);
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
