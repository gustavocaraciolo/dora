import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemConfig } from 'app/shared/model/system-config.model';
import { SystemConfigService } from './system-config.service';

@Component({
    selector: 'jhi-system-config-delete-dialog',
    templateUrl: './system-config-delete-dialog.component.html'
})
export class SystemConfigDeleteDialogComponent {
    systemConfig: ISystemConfig;

    constructor(
        protected systemConfigService: SystemConfigService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.systemConfigService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'systemConfigListModification',
                content: 'Deleted an systemConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-system-config-delete-popup',
    template: ''
})
export class SystemConfigDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ systemConfig }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SystemConfigDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.systemConfig = systemConfig;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/system-config', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/system-config', { outlets: { popup: null } }]);
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
