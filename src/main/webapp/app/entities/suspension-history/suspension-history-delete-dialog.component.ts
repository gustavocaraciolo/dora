import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuspensionHistory } from 'app/shared/model/suspension-history.model';
import { SuspensionHistoryService } from './suspension-history.service';

@Component({
    selector: 'jhi-suspension-history-delete-dialog',
    templateUrl: './suspension-history-delete-dialog.component.html'
})
export class SuspensionHistoryDeleteDialogComponent {
    suspensionHistory: ISuspensionHistory;

    constructor(
        protected suspensionHistoryService: SuspensionHistoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.suspensionHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'suspensionHistoryListModification',
                content: 'Deleted an suspensionHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-suspension-history-delete-popup',
    template: ''
})
export class SuspensionHistoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ suspensionHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SuspensionHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.suspensionHistory = suspensionHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/suspension-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/suspension-history', { outlets: { popup: null } }]);
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
