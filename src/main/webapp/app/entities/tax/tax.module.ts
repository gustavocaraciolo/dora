import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DoraSharedModule } from 'app/shared';
import {
    TaxComponent,
    TaxDetailComponent,
    TaxUpdateComponent,
    TaxDeletePopupComponent,
    TaxDeleteDialogComponent,
    taxRoute,
    taxPopupRoute
} from './';

const ENTITY_STATES = [...taxRoute, ...taxPopupRoute];

@NgModule({
    imports: [DoraSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TaxComponent, TaxDetailComponent, TaxUpdateComponent, TaxDeleteDialogComponent, TaxDeletePopupComponent],
    entryComponents: [TaxComponent, TaxUpdateComponent, TaxDeleteDialogComponent, TaxDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraTaxModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
