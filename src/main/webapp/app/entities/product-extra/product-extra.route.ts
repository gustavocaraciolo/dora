import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductExtra } from 'app/shared/model/product-extra.model';
import { ProductExtraService } from './product-extra.service';
import { ProductExtraComponent } from './product-extra.component';
import { ProductExtraDetailComponent } from './product-extra-detail.component';
import { ProductExtraUpdateComponent } from './product-extra-update.component';
import { ProductExtraDeletePopupComponent } from './product-extra-delete-dialog.component';
import { IProductExtra } from 'app/shared/model/product-extra.model';

@Injectable({ providedIn: 'root' })
export class ProductExtraResolve implements Resolve<IProductExtra> {
    constructor(private service: ProductExtraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductExtra> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductExtra>) => response.ok),
                map((productExtra: HttpResponse<ProductExtra>) => productExtra.body)
            );
        }
        return of(new ProductExtra());
    }
}

export const productExtraRoute: Routes = [
    {
        path: '',
        component: ProductExtraComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.productExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductExtraDetailComponent,
        resolve: {
            productExtra: ProductExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductExtraUpdateComponent,
        resolve: {
            productExtra: ProductExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductExtraUpdateComponent,
        resolve: {
            productExtra: ProductExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productExtraPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductExtraDeletePopupComponent,
        resolve: {
            productExtra: ProductExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productExtra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
