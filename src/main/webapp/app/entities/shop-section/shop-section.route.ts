import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShopSection } from 'app/shared/model/shop-section.model';
import { ShopSectionService } from './shop-section.service';
import { ShopSectionComponent } from './shop-section.component';
import { ShopSectionDetailComponent } from './shop-section-detail.component';
import { ShopSectionUpdateComponent } from './shop-section-update.component';
import { ShopSectionDeletePopupComponent } from './shop-section-delete-dialog.component';
import { IShopSection } from 'app/shared/model/shop-section.model';

@Injectable({ providedIn: 'root' })
export class ShopSectionResolve implements Resolve<IShopSection> {
    constructor(private service: ShopSectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShopSection> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ShopSection>) => response.ok),
                map((shopSection: HttpResponse<ShopSection>) => shopSection.body)
            );
        }
        return of(new ShopSection());
    }
}

export const shopSectionRoute: Routes = [
    {
        path: '',
        component: ShopSectionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.shopSection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ShopSectionDetailComponent,
        resolve: {
            shopSection: ShopSectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopSection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ShopSectionUpdateComponent,
        resolve: {
            shopSection: ShopSectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopSection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ShopSectionUpdateComponent,
        resolve: {
            shopSection: ShopSectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopSection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shopSectionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ShopSectionDeletePopupComponent,
        resolve: {
            shopSection: ShopSectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.shopSection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
