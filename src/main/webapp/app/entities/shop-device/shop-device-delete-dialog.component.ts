import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShopDevice } from 'app/shared/model/shop-device.model';
import { ShopDeviceService } from './shop-device.service';

@Component({
    selector: 'jhi-shop-device-delete-dialog',
    templateUrl: './shop-device-delete-dialog.component.html'
})
export class ShopDeviceDeleteDialogComponent {
    shopDevice: IShopDevice;

    constructor(
        protected shopDeviceService: ShopDeviceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shopDeviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'shopDeviceListModification',
                content: 'Deleted an shopDevice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shop-device-delete-popup',
    template: ''
})
export class ShopDeviceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopDevice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShopDeviceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.shopDevice = shopDevice;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/shop-device', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/shop-device', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
