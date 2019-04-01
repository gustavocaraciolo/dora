import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';
import { OrdersLineVariantService } from './orders-line-variant.service';

@Component({
    selector: 'jhi-orders-line-variant-delete-dialog',
    templateUrl: './orders-line-variant-delete-dialog.component.html'
})
export class OrdersLineVariantDeleteDialogComponent {
    ordersLineVariant: IOrdersLineVariant;

    constructor(
        protected ordersLineVariantService: OrdersLineVariantService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordersLineVariantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ordersLineVariantListModification',
                content: 'Deleted an ordersLineVariant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-orders-line-variant-delete-popup',
    template: ''
})
export class OrdersLineVariantDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordersLineVariant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrdersLineVariantDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ordersLineVariant = ordersLineVariant;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/orders-line-variant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/orders-line-variant', { outlets: { popup: null } }]);
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
