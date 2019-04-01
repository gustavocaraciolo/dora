import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    SystemConfigComponent,
    SystemConfigDetailComponent,
    SystemConfigUpdateComponent,
    SystemConfigDeletePopupComponent,
    SystemConfigDeleteDialogComponent,
    systemConfigRoute,
    systemConfigPopupRoute
} from './';

const ENTITY_STATES = [...systemConfigRoute, ...systemConfigPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SystemConfigComponent,
        SystemConfigDetailComponent,
        SystemConfigUpdateComponent,
        SystemConfigDeleteDialogComponent,
        SystemConfigDeletePopupComponent
    ],
    entryComponents: [
        SystemConfigComponent,
        SystemConfigUpdateComponent,
        SystemConfigDeleteDialogComponent,
        SystemConfigDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraSystemConfigModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
