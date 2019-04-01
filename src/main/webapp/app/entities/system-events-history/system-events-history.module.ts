import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    SystemEventsHistoryComponent,
    SystemEventsHistoryDetailComponent,
    SystemEventsHistoryUpdateComponent,
    SystemEventsHistoryDeletePopupComponent,
    SystemEventsHistoryDeleteDialogComponent,
    systemEventsHistoryRoute,
    systemEventsHistoryPopupRoute
} from './';

const ENTITY_STATES = [...systemEventsHistoryRoute, ...systemEventsHistoryPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SystemEventsHistoryComponent,
        SystemEventsHistoryDetailComponent,
        SystemEventsHistoryUpdateComponent,
        SystemEventsHistoryDeleteDialogComponent,
        SystemEventsHistoryDeletePopupComponent
    ],
    entryComponents: [
        SystemEventsHistoryComponent,
        SystemEventsHistoryUpdateComponent,
        SystemEventsHistoryDeleteDialogComponent,
        SystemEventsHistoryDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraSystemEventsHistoryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
