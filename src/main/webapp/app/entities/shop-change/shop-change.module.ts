import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    ShopChangeComponent,
    ShopChangeDetailComponent,
    ShopChangeUpdateComponent,
    ShopChangeDeletePopupComponent,
    ShopChangeDeleteDialogComponent,
    shopChangeRoute,
    shopChangePopupRoute
} from './';

const ENTITY_STATES = [...shopChangeRoute, ...shopChangePopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShopChangeComponent,
        ShopChangeDetailComponent,
        ShopChangeUpdateComponent,
        ShopChangeDeleteDialogComponent,
        ShopChangeDeletePopupComponent
    ],
    entryComponents: [ShopChangeComponent, ShopChangeUpdateComponent, ShopChangeDeleteDialogComponent, ShopChangeDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraShopChangeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
