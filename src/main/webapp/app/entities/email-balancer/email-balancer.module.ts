import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    EmailBalancerComponent,
    EmailBalancerDetailComponent,
    EmailBalancerUpdateComponent,
    EmailBalancerDeletePopupComponent,
    EmailBalancerDeleteDialogComponent,
    emailBalancerRoute,
    emailBalancerPopupRoute
} from './';

const ENTITY_STATES = [...emailBalancerRoute, ...emailBalancerPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmailBalancerComponent,
        EmailBalancerDetailComponent,
        EmailBalancerUpdateComponent,
        EmailBalancerDeleteDialogComponent,
        EmailBalancerDeletePopupComponent
    ],
    entryComponents: [
        EmailBalancerComponent,
        EmailBalancerUpdateComponent,
        EmailBalancerDeleteDialogComponent,
        EmailBalancerDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraEmailBalancerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
