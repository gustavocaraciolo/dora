import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductVariant } from 'app/shared/model/product-variant.model';
import { ProductVariantService } from './product-variant.service';
import { ProductVariantComponent } from './product-variant.component';
import { ProductVariantDetailComponent } from './product-variant-detail.component';
import { ProductVariantUpdateComponent } from './product-variant-update.component';
import { ProductVariantDeletePopupComponent } from './product-variant-delete-dialog.component';
import { IProductVariant } from 'app/shared/model/product-variant.model';

@Injectable({ providedIn: 'root' })
export class ProductVariantResolve implements Resolve<IProductVariant> {
    constructor(private service: ProductVariantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductVariant> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductVariant>) => response.ok),
                map((productVariant: HttpResponse<ProductVariant>) => productVariant.body)
            );
        }
        return of(new ProductVariant());
    }
}

export const productVariantRoute: Routes = [
    {
        path: '',
        component: ProductVariantComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'doraApp.productVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductVariantDetailComponent,
        resolve: {
            productVariant: ProductVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductVariantUpdateComponent,
        resolve: {
            productVariant: ProductVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductVariantUpdateComponent,
        resolve: {
            productVariant: ProductVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productVariant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productVariantPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductVariantDeletePopupComponent,
        resolve: {
            productVariant: ProductVariantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doraApp.productVariant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
