import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemEventsHistory } from 'app/shared/model/system-events-history.model';
import { SystemEventsHistoryService } from './system-events-history.service';
import { SystemEventsHistoryComponent } from './system-events-history.component';
import { SystemEventsHistoryDetailComponent } from './system-events-history-detail.component';
import { SystemEventsHistoryUpdateComponent } from './system-events-history-update.component';
import { SystemEventsHistoryDeletePopupComponent } from './system-events-history-delete-dialog.component';
import { ISystemEventsHistory } from 'app/shared/model/system-events-history.model';

@Injectable({ providedIn: 'root' })
export class SystemEventsHistoryResolve implements Resolve<ISystemEventsHistory> {
    constructor(private service: SystemEventsHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemEventsHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SystemEventsHistory>) => response.ok),
                map((systemEventsHistory: HttpResponse<SystemEventsHistory>) => systemEventsHistory.body)
            );
        }
        return of(new SystemEventsHistory());
    }
}

export const systemEventsHistoryRoute: Routes = [
    {
        path: '',
        component: SystemEventsHistoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.systemEventsHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SystemEventsHistoryDetailComponent,
        resolve: {
            systemEventsHistory: SystemEventsHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemEventsHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SystemEventsHistoryUpdateComponent,
        resolve: {
            systemEventsHistory: SystemEventsHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemEventsHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SystemEventsHistoryUpdateComponent,
        resolve: {
            systemEventsHistory: SystemEventsHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemEventsHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const systemEventsHistoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SystemEventsHistoryDeletePopupComponent,
        resolve: {
            systemEventsHistory: SystemEventsHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemEventsHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
