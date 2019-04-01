import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    OrdersLineVariantComponent,
    OrdersLineVariantDetailComponent,
    OrdersLineVariantUpdateComponent,
    OrdersLineVariantDeletePopupComponent,
    OrdersLineVariantDeleteDialogComponent,
    ordersLineVariantRoute,
    ordersLineVariantPopupRoute
} from './';

const ENTITY_STATES = [...ordersLineVariantRoute, ...ordersLineVariantPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrdersLineVariantComponent,
        OrdersLineVariantDetailComponent,
        OrdersLineVariantUpdateComponent,
        OrdersLineVariantDeleteDialogComponent,
        OrdersLineVariantDeletePopupComponent
    ],
    entryComponents: [
        OrdersLineVariantComponent,
        OrdersLineVariantUpdateComponent,
        OrdersLineVariantDeleteDialogComponent,
        OrdersLineVariantDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraOrdersLineVariantModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
