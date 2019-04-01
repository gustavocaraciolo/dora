import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISectionTable } from 'app/shared/model/section-table.model';
import { SectionTableService } from './section-table.service';

@Component({
    selector: 'jhi-section-table-delete-dialog',
    templateUrl: './section-table-delete-dialog.component.html'
})
export class SectionTableDeleteDialogComponent {
    sectionTable: ISectionTable;

    constructor(
        protected sectionTableService: SectionTableService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sectionTableService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sectionTableListModification',
                content: 'Deleted an sectionTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-section-table-delete-popup',
    template: ''
})
export class SectionTableDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sectionTable }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SectionTableDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sectionTable = sectionTable;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/section-table', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/section-table', { outlets: { popup: null } }]);
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
