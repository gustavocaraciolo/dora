import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdersLineExtra } from 'app/shared/model/orders-line-extra.model';
import { OrdersLineExtraService } from './orders-line-extra.service';
import { OrdersLineExtraComponent } from './orders-line-extra.component';
import { OrdersLineExtraDetailComponent } from './orders-line-extra-detail.component';
import { OrdersLineExtraUpdateComponent } from './orders-line-extra-update.component';
import { OrdersLineExtraDeletePopupComponent } from './orders-line-extra-delete-dialog.component';
import { IOrdersLineExtra } from 'app/shared/model/orders-line-extra.model';

@Injectable({ providedIn: 'root' })
export class OrdersLineExtraResolve implements Resolve<IOrdersLineExtra> {
    constructor(private service: OrdersLineExtraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdersLineExtra> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrdersLineExtra>) => response.ok),
                map((ordersLineExtra: HttpResponse<OrdersLineExtra>) => ordersLineExtra.body)
            );
        }
        return of(new OrdersLineExtra());
    }
}

export const ordersLineExtraRoute: Routes = [
    {
        path: '',
        component: OrdersLineExtraComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.ordersLineExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrdersLineExtraDetailComponent,
        resolve: {
            ordersLineExtra: OrdersLineExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrdersLineExtraUpdateComponent,
        resolve: {
            ordersLineExtra: OrdersLineExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OrdersLineExtraUpdateComponent,
        resolve: {
            ordersLineExtra: OrdersLineExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordersLineExtraPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OrdersLineExtraDeletePopupComponent,
        resolve: {
            ordersLineExtra: OrdersLineExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLineExtra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
