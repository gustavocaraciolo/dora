import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PaymentMethod } from 'app/shared/model/payment-method.model';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodComponent } from './payment-method.component';
import { PaymentMethodDetailComponent } from './payment-method-detail.component';
import { PaymentMethodUpdateComponent } from './payment-method-update.component';
import { PaymentMethodDeletePopupComponent } from './payment-method-delete-dialog.component';
import { IPaymentMethod } from 'app/shared/model/payment-method.model';

@Injectable({ providedIn: 'root' })
export class PaymentMethodResolve implements Resolve<IPaymentMethod> {
    constructor(private service: PaymentMethodService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaymentMethod> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PaymentMethod>) => response.ok),
                map((paymentMethod: HttpResponse<PaymentMethod>) => paymentMethod.body)
            );
        }
        return of(new PaymentMethod());
    }
}

export const paymentMethodRoute: Routes = [
    {
        path: '',
        component: PaymentMethodComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PaymentMethodDetailComponent,
        resolve: {
            paymentMethod: PaymentMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PaymentMethodUpdateComponent,
        resolve: {
            paymentMethod: PaymentMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PaymentMethodUpdateComponent,
        resolve: {
            paymentMethod: PaymentMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentMethodPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PaymentMethodDeletePopupComponent,
        resolve: {
            paymentMethod: PaymentMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
