import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISectionTable } from 'app/shared/model/section-table.model';
import { SectionTableService } from './section-table.service';
import { IShopSection } from 'app/shared/model/shop-section.model';
import { ShopSectionService } from 'app/entities/shop-section';

@Component({
    selector: 'jhi-section-table-update',
    templateUrl: './section-table-update.component.html'
})
export class SectionTableUpdateComponent implements OnInit {
    sectionTable: ISectionTable;
    isSaving: boolean;

    shopsections: IShopSection[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sectionTableService: SectionTableService,
        protected shopSectionService: ShopSectionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sectionTable }) => {
            this.sectionTable = sectionTable;
        });
        this.shopSectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IShopSection[]>) => mayBeOk.ok),
                map((response: HttpResponse<IShopSection[]>) => response.body)
            )
            .subscribe((res: IShopSection[]) => (this.shopsections = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sectionTable.id !== undefined) {
            this.subscribeToSaveResponse(this.sectionTableService.update(this.sectionTable));
        } else {
            this.subscribeToSaveResponse(this.sectionTableService.create(this.sectionTable));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISectionTable>>) {
        result.subscribe((res: HttpResponse<ISectionTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackShopSectionById(index: number, item: IShopSection) {
        return item.id;
    }
}
