import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentMethodConfig } from 'app/shared/model/payment-method-config.model';
import { PaymentMethodConfigService } from './payment-method-config.service';

@Component({
    selector: 'jhi-payment-method-config-delete-dialog',
    templateUrl: './payment-method-config-delete-dialog.component.html'
})
export class PaymentMethodConfigDeleteDialogComponent {
    paymentMethodConfig: IPaymentMethodConfig;

    constructor(
        protected paymentMethodConfigService: PaymentMethodConfigService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentMethodConfigService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'paymentMethodConfigListModification',
                content: 'Deleted an paymentMethodConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-method-config-delete-popup',
    template: ''
})
export class PaymentMethodConfigDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ paymentMethodConfig }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PaymentMethodConfigDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.paymentMethodConfig = paymentMethodConfig;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/payment-method-config', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/payment-method-config', { outlets: { popup: null } }]);
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
