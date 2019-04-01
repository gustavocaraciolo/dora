import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeTimesheet } from 'app/shared/model/employee-timesheet.model';
import { EmployeeTimesheetService } from './employee-timesheet.service';

@Component({
    selector: 'jhi-employee-timesheet-delete-dialog',
    templateUrl: './employee-timesheet-delete-dialog.component.html'
})
export class EmployeeTimesheetDeleteDialogComponent {
    employeeTimesheet: IEmployeeTimesheet;

    constructor(
        protected employeeTimesheetService: EmployeeTimesheetService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeTimesheetService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'employeeTimesheetListModification',
                content: 'Deleted an employeeTimesheet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-timesheet-delete-popup',
    template: ''
})
export class EmployeeTimesheetDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employeeTimesheet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmployeeTimesheetDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.employeeTimesheet = employeeTimesheet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/employee-timesheet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/employee-timesheet', { outlets: { popup: null } }]);
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
