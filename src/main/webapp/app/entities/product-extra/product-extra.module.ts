import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    ProductExtraComponent,
    ProductExtraDetailComponent,
    ProductExtraUpdateComponent,
    ProductExtraDeletePopupComponent,
    ProductExtraDeleteDialogComponent,
    productExtraRoute,
    productExtraPopupRoute
} from './';

const ENTITY_STATES = [...productExtraRoute, ...productExtraPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductExtraComponent,
        ProductExtraDetailComponent,
        ProductExtraUpdateComponent,
        ProductExtraDeleteDialogComponent,
        ProductExtraDeletePopupComponent
    ],
    entryComponents: [
        ProductExtraComponent,
        ProductExtraUpdateComponent,
        ProductExtraDeleteDialogComponent,
        ProductExtraDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraProductExtraModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
