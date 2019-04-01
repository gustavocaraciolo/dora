import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShopChange } from 'app/shared/model/shop-change.model';
import { ShopChangeService } from './shop-change.service';

@Component({
    selector: 'jhi-shop-change-delete-dialog',
    templateUrl: './shop-change-delete-dialog.component.html'
})
export class ShopChangeDeleteDialogComponent {
    shopChange: IShopChange;

    constructor(
        protected shopChangeService: ShopChangeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shopChangeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'shopChangeListModification',
                content: 'Deleted an shopChange'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shop-change-delete-popup',
    template: ''
})
export class ShopChangeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopChange }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShopChangeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.shopChange = shopChange;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/shop-change', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/shop-change', { outlets: { popup: null } }]);
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
