import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShopChange } from 'app/shared/model/shop-change.model';
import { ShopChangeService } from './shop-change.service';
import { ShopChangeComponent } from './shop-change.component';
import { ShopChangeDetailComponent } from './shop-change-detail.component';
import { ShopChangeUpdateComponent } from './shop-change-update.component';
import { ShopChangeDeletePopupComponent } from './shop-change-delete-dialog.component';
import { IShopChange } from 'app/shared/model/shop-change.model';

@Injectable({ providedIn: 'root' })
export class ShopChangeResolve implements Resolve<IShopChange> {
    constructor(private service: ShopChangeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShopChange> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ShopChange>) => response.ok),
                map((shopChange: HttpResponse<ShopChange>) => shopChange.body)
            );
        }
        return of(new ShopChange());
    }
}

export const shopChangeRoute: Routes = [
    {
        path: '',
        component: ShopChangeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.shopChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ShopChangeDetailComponent,
        resolve: {
            shopChange: ShopChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ShopChangeUpdateComponent,
        resolve: {
            shopChange: ShopChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ShopChangeUpdateComponent,
        resolve: {
            shopChange: ShopChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shopChangePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ShopChangeDeletePopupComponent,
        resolve: {
            shopChange: ShopChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopChange.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
