import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdersLineVariant } from 'app/shared/model/orders-line-variant.model';
import { OrdersLineVariantService } from './orders-line-variant.service';
import { OrdersLineVariantComponent } from './orders-line-variant.component';
import { OrdersLineVariantDetailComponent } from './orders-line-variant-detail.component';
import { OrdersLineVariantUpdateComponent } from './orders-line-variant-update.component';
import { OrdersLineVariantDeletePopupComponent } from './orders-line-variant-delete-dialog.component';
import { IOrdersLineVariant } from 'app/shared/model/orders-line-variant.model';

@Injectable({ providedIn: 'root' })
export class OrdersLineVariantResolve implements Resolve<IOrdersLineVariant> {
    constructor(private service: OrdersLineVariantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdersLineVariant> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrdersLineVariant>) => response.ok),
                map((ordersLineVariant: HttpResponse<OrdersLineVariant>) => ordersLineVariant.body)
            );
        }
        return of(new OrdersLineVariant());
    }
}

export const ordersLineVariantRoute: Routes = [
    {
        path: '',
        component: OrdersLineVariantComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.ordersLineVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrdersLineVariantDetailComponent,
        resolve: {
            ordersLineVariant: OrdersLineVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrdersLineVariantUpdateComponent,
        resolve: {
            ordersLineVariant: OrdersLineVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OrdersLineVariantUpdateComponent,
        resolve: {
            ordersLineVariant: OrdersLineVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordersLineVariantPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OrdersLineVariantDeletePopupComponent,
        resolve: {
            ordersLineVariant: OrdersLineVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineVariant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
