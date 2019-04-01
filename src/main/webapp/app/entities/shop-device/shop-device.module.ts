import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    ShopDeviceComponent,
    ShopDeviceDetailComponent,
    ShopDeviceUpdateComponent,
    ShopDeviceDeletePopupComponent,
    ShopDeviceDeleteDialogComponent,
    shopDeviceRoute,
    shopDevicePopupRoute
} from './';

const ENTITY_STATES = [...shopDeviceRoute, ...shopDevicePopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShopDeviceComponent,
        ShopDeviceDetailComponent,
        ShopDeviceUpdateComponent,
        ShopDeviceDeleteDialogComponent,
        ShopDeviceDeletePopupComponent
    ],
    entryComponents: [ShopDeviceComponent, ShopDeviceUpdateComponent, ShopDeviceDeleteDialogComponent, ShopDeviceDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraShopDeviceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
