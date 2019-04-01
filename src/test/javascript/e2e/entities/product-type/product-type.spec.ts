/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductTypeComponentsPage, ProductTypeDeleteDialog, ProductTypeUpdatePage } from './product-type.page-object';

const expect = chai.expect;

describe('ProductType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productTypeUpdatePage: ProductTypeUpdatePage;
    let productTypeComponentsPage: ProductTypeComponentsPage;
    let productTypeDeleteDialog: ProductTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductTypes', async () => {
        await navBarPage.goToEntity('product-type');
        productTypeComponentsPage = new ProductTypeComponentsPage();
        await browser.wait(ec.visibilityOf(productTypeComponentsPage.title), 5000);
        expect(await productTypeComponentsPage.getTitle()).to.eq('doraApp.productType.home.title');
    });

    it('should load create ProductType page', async () => {
        await productTypeComponentsPage.clickOnCreateButton();
        productTypeUpdatePage = new ProductTypeUpdatePage();
        expect(await productTypeUpdatePage.getPageTitle()).to.eq('doraApp.productType.home.createOrEditLabel');
        await productTypeUpdatePage.cancel();
    });

    it('should create and save ProductTypes', async () => {
        const nbButtonsBeforeCreate = await productTypeComponentsPage.countDeleteButtons();

        await productTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            productTypeUpdatePage.setProductTypeInput('productType'),
            productTypeUpdatePage.setProductTypeDescriptionInput('productTypeDescription'),
            productTypeUpdatePage.shopSelectLastOption()
        ]);
        expect(await productTypeUpdatePage.getProductTypeInput()).to.eq('productType');
        expect(await productTypeUpdatePage.getProductTypeDescriptionInput()).to.eq('productTypeDescription');
        await productTypeUpdatePage.save();
        expect(await productTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductType', async () => {
        const nbButtonsBeforeDelete = await productTypeComponentsPage.countDeleteButtons();
        await productTypeComponentsPage.clickOnLastDeleteButton();

        productTypeDeleteDialog = new ProductTypeDeleteDialog();
        expect(await productTypeDeleteDialog.getDialogTitle()).to.eq('doraApp.productType.delete.question');
        await productTypeDeleteDialog.clickOnConfirmButton();

        expect(await productTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
