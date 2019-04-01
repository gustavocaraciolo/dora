/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductComponentsPage, ProductDeleteDialog, ProductUpdatePage } from './product.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Product e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productUpdatePage: ProductUpdatePage;
    let productComponentsPage: ProductComponentsPage;
    let productDeleteDialog: ProductDeleteDialog;
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

    it('should load Products', async () => {
        await navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        await browser.wait(ec.visibilityOf(productComponentsPage.title), 5000);
        expect(await productComponentsPage.getTitle()).to.eq('doraApp.product.home.title');
    });

    it('should load create Product page', async () => {
        await productComponentsPage.clickOnCreateButton();
        productUpdatePage = new ProductUpdatePage();
        expect(await productUpdatePage.getPageTitle()).to.eq('doraApp.product.home.createOrEditLabel');
        await productUpdatePage.cancel();
    });

    it('should create and save Products', async () => {
        const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();

        await productComponentsPage.clickOnCreateButton();
        await promise.all([
            productUpdatePage.setProductNameInput('productName'),
            productUpdatePage.setProductDescriptionInput('productDescription'),
            productUpdatePage.setPriceInput('5'),
            productUpdatePage.setQuantityInput('5'),
            productUpdatePage.setProductImageFullInput(absolutePath),
            productUpdatePage.setProductImageFullUrlInput('productImageFullUrl'),
            productUpdatePage.setProductImageThumbInput(absolutePath),
            productUpdatePage.setProductImageThumbUrlInput('productImageThumbUrl'),
            productUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            productUpdatePage.setBarcodeInput('barcode'),
            productUpdatePage.setSerialCodeInput('serialCode'),
            productUpdatePage.setPriorityPositionInput('5'),
            productUpdatePage.productTypesSelectLastOption(),
            productUpdatePage.shopSelectLastOption(),
            productUpdatePage.discountsSelectLastOption(),
            productUpdatePage.taxesSelectLastOption(),
            productUpdatePage.categorySelectLastOption()
        ]);
        expect(await productUpdatePage.getProductNameInput()).to.eq('productName');
        expect(await productUpdatePage.getProductDescriptionInput()).to.eq('productDescription');
        expect(await productUpdatePage.getPriceInput()).to.eq('5');
        expect(await productUpdatePage.getQuantityInput()).to.eq('5');
        expect(await productUpdatePage.getProductImageFullInput()).to.endsWith(fileNameToUpload);
        expect(await productUpdatePage.getProductImageFullUrlInput()).to.eq('productImageFullUrl');
        expect(await productUpdatePage.getProductImageThumbInput()).to.endsWith(fileNameToUpload);
        expect(await productUpdatePage.getProductImageThumbUrlInput()).to.eq('productImageThumbUrl');
        expect(await productUpdatePage.getDateCreatedInput()).to.contain('2001-01-01T02:30');
        expect(await productUpdatePage.getBarcodeInput()).to.eq('barcode');
        expect(await productUpdatePage.getSerialCodeInput()).to.eq('serialCode');
        expect(await productUpdatePage.getPriorityPositionInput()).to.eq('5');
        const selectedActive = productUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await productUpdatePage.getActiveInput().click();
            expect(await productUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await productUpdatePage.getActiveInput().click();
            expect(await productUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        const selectedIsVariantProduct = productUpdatePage.getIsVariantProductInput();
        if (await selectedIsVariantProduct.isSelected()) {
            await productUpdatePage.getIsVariantProductInput().click();
            expect(await productUpdatePage.getIsVariantProductInput().isSelected()).to.be.false;
        } else {
            await productUpdatePage.getIsVariantProductInput().click();
            expect(await productUpdatePage.getIsVariantProductInput().isSelected()).to.be.true;
        }
        await productUpdatePage.save();
        expect(await productUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Product', async () => {
        const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
        await productComponentsPage.clickOnLastDeleteButton();

        productDeleteDialog = new ProductDeleteDialog();
        expect(await productDeleteDialog.getDialogTitle()).to.eq('doraApp.product.delete.question');
        await productDeleteDialog.clickOnConfirmButton();

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
