import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemConfig } from 'app/shared/model/system-config.model';
import { SystemConfigService } from './system-config.service';
import { SystemConfigComponent } from './system-config.component';
import { SystemConfigDetailComponent } from './system-config-detail.component';
import { SystemConfigUpdateComponent } from './system-config-update.component';
import { SystemConfigDeletePopupComponent } from './system-config-delete-dialog.component';
import { ISystemConfig } from 'app/shared/model/system-config.model';

@Injectable({ providedIn: 'root' })
export class SystemConfigResolve implements Resolve<ISystemConfig> {
    constructor(private service: SystemConfigService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemConfig> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SystemConfig>) => response.ok),
                map((systemConfig: HttpResponse<SystemConfig>) => systemConfig.body)
            );
        }
        return of(new SystemConfig());
    }
}

export const systemConfigRoute: Routes = [
    {
        path: '',
        component: SystemConfigComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.systemConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SystemConfigDetailComponent,
        resolve: {
            systemConfig: SystemConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SystemConfigUpdateComponent,
        resolve: {
            systemConfig: SystemConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SystemConfigUpdateComponent,
        resolve: {
            systemConfig: SystemConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const systemConfigPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SystemConfigDeletePopupComponent,
        resolve: {
            systemConfig: SystemConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.systemConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
