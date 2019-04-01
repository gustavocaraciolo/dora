import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SectionTable } from 'app/shared/model/section-table.model';
import { SectionTableService } from './section-table.service';
import { SectionTableComponent } from './section-table.component';
import { SectionTableDetailComponent } from './section-table-detail.component';
import { SectionTableUpdateComponent } from './section-table-update.component';
import { SectionTableDeletePopupComponent } from './section-table-delete-dialog.component';
import { ISectionTable } from 'app/shared/model/section-table.model';

@Injectable({ providedIn: 'root' })
export class SectionTableResolve implements Resolve<ISectionTable> {
    constructor(private service: SectionTableService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISectionTable> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SectionTable>) => response.ok),
                map((sectionTable: HttpResponse<SectionTable>) => sectionTable.body)
            );
        }
        return of(new SectionTable());
    }
}

export const sectionTableRoute: Routes = [
    {
        path: '',
        component: SectionTableComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.sectionTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SectionTableDetailComponent,
        resolve: {
            sectionTable: SectionTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.sectionTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SectionTableUpdateComponent,
        resolve: {
            sectionTable: SectionTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.sectionTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SectionTableUpdateComponent,
        resolve: {
            sectionTable: SectionTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.sectionTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectionTablePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SectionTableDeletePopupComponent,
        resolve: {
            sectionTable: SectionTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.sectionTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
