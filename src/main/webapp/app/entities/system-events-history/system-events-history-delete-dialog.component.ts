import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemEventsHistory } from 'app/shared/model/system-events-history.model';
import { SystemEventsHistoryService } from './system-events-history.service';

@Component({
    selector: 'jhi-system-events-history-delete-dialog',
    templateUrl: './system-events-history-delete-dialog.component.html'
})
export class SystemEventsHistoryDeleteDialogComponent {
    systemEventsHistory: ISystemEventsHistory;

    constructor(
        protected systemEventsHistoryService: SystemEventsHistoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.systemEventsHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'systemEventsHistoryListModification',
                content: 'Deleted an systemEventsHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-system-events-history-delete-popup',
    template: ''
})
export class SystemEventsHistoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ systemEventsHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SystemEventsHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.systemEventsHistory = systemEventsHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/system-events-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/system-events-history', { outlets: { popup: null } }]);
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
