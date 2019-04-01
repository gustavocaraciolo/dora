/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoraTestModule } from '../../../test.module';
import { ShopDeviceDeleteDialogComponent } from 'app/entities/shop-device/shop-device-delete-dialog.component';
import { ShopDeviceService } from 'app/entities/shop-device/shop-device.service';

describe('Component Tests', () => {
    describe('ShopDevice Management Delete Component', () => {
        let comp: ShopDeviceDeleteDialogComponent;
        let fixture: ComponentFixture<ShopDeviceDeleteDialogComponent>;
        let service: ShopDeviceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopDeviceDeleteDialogComponent]
            })
                .overrideTemplate(ShopDeviceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopDeviceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopDeviceService);
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
