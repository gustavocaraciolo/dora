/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { SuspensionHistoryDeleteDialogComponent } from 'app/entities/suspension-history/suspension-history-delete-dialog.component';
import { SuspensionHistoryService } from 'app/entities/suspension-history/suspension-history.service';

describe('Component Tests', () => {
    describe('SuspensionHistory Management Delete Component', () => {
        let comp: SuspensionHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<SuspensionHistoryDeleteDialogComponent>;
        let service: SuspensionHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SuspensionHistoryDeleteDialogComponent]
            })
                .overrideTemplate(SuspensionHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SuspensionHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuspensionHistoryService);
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
