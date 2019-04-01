import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    OrdersLineComponent,
    OrdersLineDetailComponent,
    OrdersLineUpdateComponent,
    OrdersLineDeletePopupComponent,
    OrdersLineDeleteDialogComponent,
    ordersLineRoute,
    ordersLinePopupRoute
} from './';

const ENTITY_STATES = [...ordersLineRoute, ...ordersLinePopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrdersLineComponent,
        OrdersLineDetailComponent,
        OrdersLineUpdateComponent,
        OrdersLineDeleteDialogComponent,
        OrdersLineDeletePopupComponent
    ],
    entryComponents: [OrdersLineComponent, OrdersLineUpdateComponent, OrdersLineDeleteDialogComponent, OrdersLineDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraOrdersLineModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
