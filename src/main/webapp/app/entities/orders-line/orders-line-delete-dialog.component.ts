import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdersLine } from 'app/shared/model/orders-line.model';
import { OrdersLineService } from './orders-line.service';

@Component({
    selector: 'jhi-orders-line-delete-dialog',
    templateUrl: './orders-line-delete-dialog.component.html'
})
export class OrdersLineDeleteDialogComponent {
    ordersLine: IOrdersLine;

    constructor(
        protected ordersLineService: OrdersLineService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordersLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ordersLineListModification',
                content: 'Deleted an ordersLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-orders-line-delete-popup',
    template: ''
})
export class OrdersLineDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordersLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrdersLineDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ordersLine = ordersLine;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/orders-line', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/orders-line', { outlets: { popup: null } }]);
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
