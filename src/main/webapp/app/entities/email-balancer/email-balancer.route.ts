import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmailBalancer } from 'app/shared/model/email-balancer.model';
import { EmailBalancerService } from './email-balancer.service';
import { EmailBalancerComponent } from './email-balancer.component';
import { EmailBalancerDetailComponent } from './email-balancer-detail.component';
import { EmailBalancerUpdateComponent } from './email-balancer-update.component';
import { EmailBalancerDeletePopupComponent } from './email-balancer-delete-dialog.component';
import { IEmailBalancer } from 'app/shared/model/email-balancer.model';

@Injectable({ providedIn: 'root' })
export class EmailBalancerResolve implements Resolve<IEmailBalancer> {
    constructor(private service: EmailBalancerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmailBalancer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EmailBalancer>) => response.ok),
                map((emailBalancer: HttpResponse<EmailBalancer>) => emailBalancer.body)
            );
        }
        return of(new EmailBalancer());
    }
}

export const emailBalancerRoute: Routes = [
    {
        path: '',
        component: EmailBalancerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.emailBalancer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EmailBalancerDetailComponent,
        resolve: {
            emailBalancer: EmailBalancerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.emailBalancer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EmailBalancerUpdateComponent,
        resolve: {
            emailBalancer: EmailBalancerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.emailBalancer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EmailBalancerUpdateComponent,
        resolve: {
            emailBalancer: EmailBalancerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.emailBalancer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emailBalancerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EmailBalancerDeletePopupComponent,
        resolve: {
            emailBalancer: EmailBalancerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.emailBalancer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
