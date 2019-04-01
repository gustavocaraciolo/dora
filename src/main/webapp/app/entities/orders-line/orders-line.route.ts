import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdersLine } from 'app/shared/model/orders-line.model';
import { OrdersLineService } from './orders-line.service';
import { OrdersLineComponent } from './orders-line.component';
import { OrdersLineDetailComponent } from './orders-line-detail.component';
import { OrdersLineUpdateComponent } from './orders-line-update.component';
import { OrdersLineDeletePopupComponent } from './orders-line-delete-dialog.component';
import { IOrdersLine } from 'app/shared/model/orders-line.model';

@Injectable({ providedIn: 'root' })
export class OrdersLineResolve implements Resolve<IOrdersLine> {
    constructor(private service: OrdersLineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdersLine> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrdersLine>) => response.ok),
                map((ordersLine: HttpResponse<OrdersLine>) => ordersLine.body)
            );
        }
        return of(new OrdersLine());
    }
}

export const ordersLineRoute: Routes = [
    {
        path: '',
        component: OrdersLineComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.ordersLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrdersLineDetailComponent,
        resolve: {
            ordersLine: OrdersLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrdersLineUpdateComponent,
        resolve: {
            ordersLine: OrdersLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OrdersLineUpdateComponent,
        resolve: {
            ordersLine: OrdersLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordersLinePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OrdersLineDeletePopupComponent,
        resolve: {
            ordersLine: OrdersLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.ordersLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
