import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeTimesheet } from 'app/shared/model/employee-timesheet.model';

@Component({
    selector: 'jhi-employee-timesheet-detail',
    templateUrl: './employee-timesheet-detail.component.html'
})
export class EmployeeTimesheetDetailComponent implements OnInit {
    employeeTimesheet: IEmployeeTimesheet;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employeeTimesheet }) => {
            this.employeeTimesheet = employeeTimesheet;
        });
    }

    previousState() {
        window.history.back();
    }
}
