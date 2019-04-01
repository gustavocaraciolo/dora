/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductCategoryComponentsPage, ProductCategoryDeleteDialog, ProductCategoryUpdatePage } from './product-category.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ProductCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productCategoryUpdatePage: ProductCategoryUpdatePage;
    let productCategoryComponentsPage: ProductCategoryComponentsPage;
    let productCategoryDeleteDialog: ProductCategoryDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductCategories', async () => {
        await navBarPage.goToEntity('product-category');
        productCategoryComponentsPage = new ProductCategoryComponentsPage();
        await browser.wait(ec.visibilityOf(productCategoryComponentsPage.title), 5000);
        expect(await productCategoryComponentsPage.getTitle()).to.eq('doraApp.productCategory.home.title');
    });

    it('should load create ProductCategory page', async () => {
        await productCategoryComponentsPage.clickOnCreateButton();
        productCategoryUpdatePage = new ProductCategoryUpdatePage();
        expect(await productCategoryUpdatePage.getPageTitle()).to.eq('doraApp.productCategory.home.createOrEditLabel');
        await productCategoryUpdatePage.cancel();
    });

    it('should create and save ProductCategories', async () => {
        const nbButtonsBeforeCreate = await productCategoryComponentsPage.countDeleteButtons();

        await productCategoryComponentsPage.clickOnCreateButton();
        await promise.all([
            productCategoryUpdatePage.setCategoryInput('category'),
            productCategoryUpdatePage.setDescriptionInput('description'),
            productCategoryUpdatePage.setImageFullInput(absolutePath),
            productCategoryUpdatePage.setImageFullUrlInput('imageFullUrl'),
            productCategoryUpdatePage.setImageThumbInput(absolutePath),
            productCategoryUpdatePage.setImageThumbUrlInput('imageThumbUrl'),
            productCategoryUpdatePage.shopSelectLastOption()
        ]);
        expect(await productCategoryUpdatePage.getCategoryInput()).to.eq('category');
        expect(await productCategoryUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await productCategoryUpdatePage.getImageFullInput()).to.endsWith(fileNameToUpload);
        expect(await productCategoryUpdatePage.getImageFullUrlInput()).to.eq('imageFullUrl');
        expect(await productCategoryUpdatePage.getImageThumbInput()).to.endsWith(fileNameToUpload);
        expect(await productCategoryUpdatePage.getImageThumbUrlInput()).to.eq('imageThumbUrl');
        await productCategoryUpdatePage.save();
        expect(await productCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductCategory', async () => {
        const nbButtonsBeforeDelete = await productCategoryComponentsPage.countDeleteButtons();
        await productCategoryComponentsPage.clickOnLastDeleteButton();

        productCategoryDeleteDialog = new ProductCategoryDeleteDialog();
        expect(await productCategoryDeleteDialog.getDialogTitle()).to.eq('doraApp.productCategory.delete.question');
        await productCategoryDeleteDialog.clickOnConfirmButton();

        expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
