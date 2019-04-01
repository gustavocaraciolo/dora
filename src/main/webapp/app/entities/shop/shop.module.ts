import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    ShopComponent,
    ShopDetailComponent,
    ShopUpdateComponent,
    ShopDeletePopupComponent,
    ShopDeleteDialogComponent,
    shopRoute,
    shopPopupRoute
} from './';

const ENTITY_STATES = [...shopRoute, ...shopPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ShopComponent, ShopDetailComponent, ShopUpdateComponent, ShopDeleteDialogComponent, ShopDeletePopupComponent],
    entryComponents: [ShopComponent, ShopUpdateComponent, ShopDeleteDialogComponent, ShopDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraShopModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
