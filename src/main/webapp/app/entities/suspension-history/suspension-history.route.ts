import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SuspensionHistory } from 'app/shared/model/suspension-history.model';
import { SuspensionHistoryService } from './suspension-history.service';
import { SuspensionHistoryComponent } from './suspension-history.component';
import { SuspensionHistoryDetailComponent } from './suspension-history-detail.component';
import { SuspensionHistoryUpdateComponent } from './suspension-history-update.component';
import { SuspensionHistoryDeletePopupComponent } from './suspension-history-delete-dialog.component';
import { ISuspensionHistory } from 'app/shared/model/suspension-history.model';

@Injectable({ providedIn: 'root' })
export class SuspensionHistoryResolve implements Resolve<ISuspensionHistory> {
    constructor(private service: SuspensionHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISuspensionHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SuspensionHistory>) => response.ok),
                map((suspensionHistory: HttpResponse<SuspensionHistory>) => suspensionHistory.body)
            );
        }
        return of(new SuspensionHistory());
    }
}

export const suspensionHistoryRoute: Routes = [
    {
        path: '',
        component: SuspensionHistoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.suspensionHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SuspensionHistoryDetailComponent,
        resolve: {
            suspensionHistory: SuspensionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.suspensionHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SuspensionHistoryUpdateComponent,
        resolve: {
            suspensionHistory: SuspensionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.suspensionHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SuspensionHistoryUpdateComponent,
        resolve: {
            suspensionHistory: SuspensionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.suspensionHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const suspensionHistoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SuspensionHistoryDeletePopupComponent,
        resolve: {
            suspensionHistory: SuspensionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.suspensionHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
