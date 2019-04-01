import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    ProductVariantComponent,
    ProductVariantDetailComponent,
    ProductVariantUpdateComponent,
    ProductVariantDeletePopupComponent,
    ProductVariantDeleteDialogComponent,
    productVariantRoute,
    productVariantPopupRoute
} from './';

const ENTITY_STATES = [...productVariantRoute, ...productVariantPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductVariantComponent,
        ProductVariantDetailComponent,
        ProductVariantUpdateComponent,
        ProductVariantDeleteDialogComponent,
        ProductVariantDeletePopupComponent
    ],
    entryComponents: [
        ProductVariantComponent,
        ProductVariantUpdateComponent,
        ProductVariantDeleteDialogComponent,
        ProductVariantDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraProductVariantModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
