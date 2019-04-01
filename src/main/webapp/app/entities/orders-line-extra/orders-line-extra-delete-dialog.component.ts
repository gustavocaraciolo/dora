import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdersLineExtra } from 'app/shared/model/orders-line-extra.model';
import { OrdersLineExtraService } from './orders-line-extra.service';

@Component({
    selector: 'jhi-orders-line-extra-delete-dialog',
    templateUrl: './orders-line-extra-delete-dialog.component.html'
})
export class OrdersLineExtraDeleteDialogComponent {
    ordersLineExtra: IOrdersLineExtra;

    constructor(
        protected ordersLineExtraService: OrdersLineExtraService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordersLineExtraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ordersLineExtraListModification',
                content: 'Deleted an ordersLineExtra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-orders-line-extra-delete-popup',
    template: ''
})
export class OrdersLineExtraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordersLineExtra }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrdersLineExtraDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ordersLineExtra = ordersLineExtra;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/orders-line-extra', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/orders-line-extra', { outlets: { popup: null } }]);
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
