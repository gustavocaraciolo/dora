import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmailBalancer } from 'app/shared/model/email-balancer.model';
import { EmailBalancerService } from './email-balancer.service';

@Component({
    selector: 'jhi-email-balancer-delete-dialog',
    templateUrl: './email-balancer-delete-dialog.component.html'
})
export class EmailBalancerDeleteDialogComponent {
    emailBalancer: IEmailBalancer;

    constructor(
        protected emailBalancerService: EmailBalancerService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emailBalancerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'emailBalancerListModification',
                content: 'Deleted an emailBalancer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-email-balancer-delete-popup',
    template: ''
})
export class EmailBalancerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emailBalancer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmailBalancerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.emailBalancer = emailBalancer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/email-balancer', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/email-balancer', { outlets: { popup: null } }]);
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
