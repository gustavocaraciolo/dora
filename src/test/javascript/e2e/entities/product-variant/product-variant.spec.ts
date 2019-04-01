/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductVariantComponentsPage, ProductVariantDeleteDialog, ProductVariantUpdatePage } from './product-variant.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ProductVariant e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productVariantUpdatePage: ProductVariantUpdatePage;
    let productVariantComponentsPage: ProductVariantComponentsPage;
    let productVariantDeleteDialog: ProductVariantDeleteDialog;
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

    it('should load ProductVariants', async () => {
        await navBarPage.goToEntity('product-variant');
        productVariantComponentsPage = new ProductVariantComponentsPage();
        await browser.wait(ec.visibilityOf(productVariantComponentsPage.title), 5000);
        expect(await productVariantComponentsPage.getTitle()).to.eq('doraApp.productVariant.home.title');
    });

    it('should load create ProductVariant page', async () => {
        await productVariantComponentsPage.clickOnCreateButton();
        productVariantUpdatePage = new ProductVariantUpdatePage();
        expect(await productVariantUpdatePage.getPageTitle()).to.eq('doraApp.productVariant.home.createOrEditLabel');
        await productVariantUpdatePage.cancel();
    });

    it('should create and save ProductVariants', async () => {
        const nbButtonsBeforeCreate = await productVariantComponentsPage.countDeleteButtons();

        await productVariantComponentsPage.clickOnCreateButton();
        await promise.all([
            productVariantUpdatePage.setVariantNameInput('variantName'),
            productVariantUpdatePage.setDescriptionInput('description'),
            productVariantUpdatePage.setPercentageInput('5'),
            productVariantUpdatePage.setFullPhotoInput(absolutePath),
            productVariantUpdatePage.setFullPhotoUrlInput('fullPhotoUrl'),
            productVariantUpdatePage.setThumbnailPhotoInput(absolutePath),
            productVariantUpdatePage.setThumbnailPhotoUrlInput('thumbnailPhotoUrl'),
            productVariantUpdatePage.setPriceInput('5'),
            productVariantUpdatePage.productSelectLastOption()
        ]);
        expect(await productVariantUpdatePage.getVariantNameInput()).to.eq('variantName');
        expect(await productVariantUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await productVariantUpdatePage.getPercentageInput()).to.eq('5');
        expect(await productVariantUpdatePage.getFullPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await productVariantUpdatePage.getFullPhotoUrlInput()).to.eq('fullPhotoUrl');
        expect(await productVariantUpdatePage.getThumbnailPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await productVariantUpdatePage.getThumbnailPhotoUrlInput()).to.eq('thumbnailPhotoUrl');
        expect(await productVariantUpdatePage.getPriceInput()).to.eq('5');
        await productVariantUpdatePage.save();
        expect(await productVariantUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productVariantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductVariant', async () => {
        const nbButtonsBeforeDelete = await productVariantComponentsPage.countDeleteButtons();
        await productVariantComponentsPage.clickOnLastDeleteButton();

        productVariantDeleteDialog = new ProductVariantDeleteDialog();
        expect(await productVariantDeleteDialog.getDialogTitle()).to.eq('doraApp.productVariant.delete.question');
        await productVariantDeleteDialog.clickOnConfirmButton();

        expect(await productVariantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
