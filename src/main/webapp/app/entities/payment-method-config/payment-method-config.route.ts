import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PaymentMethodConfig } from 'app/shared/model/payment-method-config.model';
import { PaymentMethodConfigService } from './payment-method-config.service';
import { PaymentMethodConfigComponent } from './payment-method-config.component';
import { PaymentMethodConfigDetailComponent } from './payment-method-config-detail.component';
import { PaymentMethodConfigUpdateComponent } from './payment-method-config-update.component';
import { PaymentMethodConfigDeletePopupComponent } from './payment-method-config-delete-dialog.component';
import { IPaymentMethodConfig } from 'app/shared/model/payment-method-config.model';

@Injectable({ providedIn: 'root' })
export class PaymentMethodConfigResolve implements Resolve<IPaymentMethodConfig> {
    constructor(private service: PaymentMethodConfigService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaymentMethodConfig> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PaymentMethodConfig>) => response.ok),
                map((paymentMethodConfig: HttpResponse<PaymentMethodConfig>) => paymentMethodConfig.body)
            );
        }
        return of(new PaymentMethodConfig());
    }
}

export const paymentMethodConfigRoute: Routes = [
    {
        path: '',
        component: PaymentMethodConfigComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.paymentMethodConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PaymentMethodConfigDetailComponent,
        resolve: {
            paymentMethodConfig: PaymentMethodConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethodConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PaymentMethodConfigUpdateComponent,
        resolve: {
            paymentMethodConfig: PaymentMethodConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethodConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PaymentMethodConfigUpdateComponent,
        resolve: {
            paymentMethodConfig: PaymentMethodConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethodConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentMethodConfigPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PaymentMethodConfigDeletePopupComponent,
        resolve: {
            paymentMethodConfig: PaymentMethodConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.paymentMethodConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
