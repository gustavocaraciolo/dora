import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'company',
                loadChildren: './company/company.module#DoraCompanyModule'
            },
            {
                path: 'shop',
                loadChildren: './shop/shop.module#DoraShopModule'
            },
            {
                path: 'shop-section',
                loadChildren: './shop-section/shop-section.module#DoraShopSectionModule'
            },
            {
                path: 'section-table',
                loadChildren: './section-table/section-table.module#DoraSectionTableModule'
            },
            {
                path: 'system-events-history',
                loadChildren: './system-events-history/system-events-history.module#DoraSystemEventsHistoryModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#DoraProductModule'
            },
            {
                path: 'product-category',
                loadChildren: './product-category/product-category.module#DoraProductCategoryModule'
            },
            {
                path: 'product-variant',
                loadChildren: './product-variant/product-variant.module#DoraProductVariantModule'
            },
            {
                path: 'product-extra',
                loadChildren: './product-extra/product-extra.module#DoraProductExtraModule'
            },
            {
                path: 'product-type',
                loadChildren: './product-type/product-type.module#DoraProductTypeModule'
            },
            {
                path: 'system-config',
                loadChildren: './system-config/system-config.module#DoraSystemConfigModule'
            },
            {
                path: 'email-balancer',
                loadChildren: './email-balancer/email-balancer.module#DoraEmailBalancerModule'
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#DoraProfileModule'
            },
            {
                path: 'employee-timesheet',
                loadChildren: './employee-timesheet/employee-timesheet.module#DoraEmployeeTimesheetModule'
            },
            {
                path: 'orders',
                loadChildren: './orders/orders.module#DoraOrdersModule'
            },
            {
                path: 'orders-line',
                loadChildren: './orders-line/orders-line.module#DoraOrdersLineModule'
            },
            {
                path: 'orders-line-variant',
                loadChildren: './orders-line-variant/orders-line-variant.module#DoraOrdersLineVariantModule'
            },
            {
                path: 'orders-line-extra',
                loadChildren: './orders-line-extra/orders-line-extra.module#DoraOrdersLineExtraModule'
            },
            {
                path: 'discount',
                loadChildren: './discount/discount.module#DoraDiscountModule'
            },
            {
                path: 'tax',
                loadChildren: './tax/tax.module#DoraTaxModule'
            },
            {
                path: 'payment-method',
                loadChildren: './payment-method/payment-method.module#DoraPaymentMethodModule'
            },
            {
                path: 'suspension-history',
                loadChildren: './suspension-history/suspension-history.module#DoraSuspensionHistoryModule'
            },
            {
                path: 'shop-device',
                loadChildren: './shop-device/shop-device.module#DoraShopDeviceModule'
            },
            {
                path: 'payment-method-config',
                loadChildren: './payment-method-config/payment-method-config.module#DoraPaymentMethodConfigModule'
            },
            {
                path: 'payment',
                loadChildren: './payment/payment.module#DoraPaymentModule'
            },
            {
                path: 'shop-change',
                loadChildren: './shop-change/shop-change.module#DoraShopChangeModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoraEntityModule {}
