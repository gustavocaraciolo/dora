import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    DiscountComponent,
    DiscountDetailComponent,
    DiscountUpdateComponent,
    DiscountDeletePopupComponent,
    DiscountDeleteDialogComponent,
    discountRoute,
    discountPopupRoute
} from './';

const ENTITY_STATES = [...discountRoute, ...discountPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiscountComponent,
        DiscountDetailComponent,
        DiscountUpdateComponent,
        DiscountDeleteDialogComponent,
        DiscountDeletePopupComponent
    ],
    entryComponents: [DiscountComponent, DiscountUpdateComponent, DiscountDeleteDialogComponent, DiscountDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraDiscountModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
