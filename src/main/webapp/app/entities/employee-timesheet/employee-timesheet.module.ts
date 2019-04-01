import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    EmployeeTimesheetComponent,
    EmployeeTimesheetDetailComponent,
    EmployeeTimesheetUpdateComponent,
    EmployeeTimesheetDeletePopupComponent,
    EmployeeTimesheetDeleteDialogComponent,
    employeeTimesheetRoute,
    employeeTimesheetPopupRoute
} from './';

const ENTITY_STATES = [...employeeTimesheetRoute, ...employeeTimesheetPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeeTimesheetComponent,
        EmployeeTimesheetDetailComponent,
        EmployeeTimesheetUpdateComponent,
        EmployeeTimesheetDeleteDialogComponent,
        EmployeeTimesheetDeletePopupComponent
    ],
    entryComponents: [
        EmployeeTimesheetComponent,
        EmployeeTimesheetUpdateComponent,
        EmployeeTimesheetDeleteDialogComponent,
        EmployeeTimesheetDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraEmployeeTimesheetModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
