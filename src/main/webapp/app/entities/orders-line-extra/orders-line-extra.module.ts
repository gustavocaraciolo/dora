import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    OrdersLineExtraComponent,
    OrdersLineExtraDetailComponent,
    OrdersLineExtraUpdateComponent,
    OrdersLineExtraDeletePopupComponent,
    OrdersLineExtraDeleteDialogComponent,
    ordersLineExtraRoute,
    ordersLineExtraPopupRoute
} from './';

const ENTITY_STATES = [...ordersLineExtraRoute, ...ordersLineExtraPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrdersLineExtraComponent,
        OrdersLineExtraDetailComponent,
        OrdersLineExtraUpdateComponent,
        OrdersLineExtraDeleteDialogComponent,
        OrdersLineExtraDeletePopupComponent
    ],
    entryComponents: [
        OrdersLineExtraComponent,
        OrdersLineExtraUpdateComponent,
        OrdersLineExtraDeleteDialogComponent,
        OrdersLineExtraDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraOrdersLineExtraModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
