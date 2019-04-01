import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShopDevice } from 'app/shared/model/shop-device.model';
import { ShopDeviceService } from './shop-device.service';
import { ShopDeviceComponent } from './shop-device.component';
import { ShopDeviceDetailComponent } from './shop-device-detail.component';
import { ShopDeviceUpdateComponent } from './shop-device-update.component';
import { ShopDeviceDeletePopupComponent } from './shop-device-delete-dialog.component';
import { IShopDevice } from 'app/shared/model/shop-device.model';

@Injectable({ providedIn: 'root' })
export class ShopDeviceResolve implements Resolve<IShopDevice> {
    constructor(private service: ShopDeviceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShopDevice> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ShopDevice>) => response.ok),
                map((shopDevice: HttpResponse<ShopDevice>) => shopDevice.body)
            );
        }
        return of(new ShopDevice());
    }
}

export const shopDeviceRoute: Routes = [
    {
        path: '',
        component: ShopDeviceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.shopDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ShopDeviceDetailComponent,
        resolve: {
            shopDevice: ShopDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ShopDeviceUpdateComponent,
        resolve: {
            shopDevice: ShopDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ShopDeviceUpdateComponent,
        resolve: {
            shopDevice: ShopDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shopDevicePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ShopDeviceDeletePopupComponent,
        resolve: {
            shopDevice: ShopDeviceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopDevice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
