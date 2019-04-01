import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    ShopSectionComponent,
    ShopSectionDetailComponent,
    ShopSectionUpdateComponent,
    ShopSectionDeletePopupComponent,
    ShopSectionDeleteDialogComponent,
    shopSectionRoute,
    shopSectionPopupRoute
} from './';

const ENTITY_STATES = [...shopSectionRoute, ...shopSectionPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShopSectionComponent,
        ShopSectionDetailComponent,
        ShopSectionUpdateComponent,
        ShopSectionDeleteDialogComponent,
        ShopSectionDeletePopupComponent
    ],
    entryComponents: [ShopSectionComponent, ShopSectionUpdateComponent, ShopSectionDeleteDialogComponent, ShopSectionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraShopSectionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
