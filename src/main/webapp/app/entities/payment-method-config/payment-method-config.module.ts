import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    PaymentMethodConfigComponent,
    PaymentMethodConfigDetailComponent,
    PaymentMethodConfigUpdateComponent,
    PaymentMethodConfigDeletePopupComponent,
    PaymentMethodConfigDeleteDialogComponent,
    paymentMethodConfigRoute,
    paymentMethodConfigPopupRoute
} from './';

const ENTITY_STATES = [...paymentMethodConfigRoute, ...paymentMethodConfigPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PaymentMethodConfigComponent,
        PaymentMethodConfigDetailComponent,
        PaymentMethodConfigUpdateComponent,
        PaymentMethodConfigDeleteDialogComponent,
        PaymentMethodConfigDeletePopupComponent
    ],
    entryComponents: [
        PaymentMethodConfigComponent,
        PaymentMethodConfigUpdateComponent,
        PaymentMethodConfigDeleteDialogComponent,
        PaymentMethodConfigDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraPaymentMethodConfigModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
