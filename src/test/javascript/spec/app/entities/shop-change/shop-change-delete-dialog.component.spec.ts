/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { ShopChangeDeleteDialogComponent } from 'app/entities/shop-change/shop-change-delete-dialog.component';
import { ShopChangeService } from 'app/entities/shop-change/shop-change.service';

describe('Component Tests', () => {
    describe('ShopChange Management Delete Component', () => {
        let comp: ShopChangeDeleteDialogComponent;
        let fixture: ComponentFixture<ShopChangeDeleteDialogComponent>;
        let service: ShopChangeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopChangeDeleteDialogComponent]
            })
                .overrideTemplate(ShopChangeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopChangeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopChangeService);
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
