/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductExtraComponentsPage, ProductExtraDeleteDialog, ProductExtraUpdatePage } from './product-extra.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ProductExtra e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productExtraUpdatePage: ProductExtraUpdatePage;
    let productExtraComponentsPage: ProductExtraComponentsPage;
    let productExtraDeleteDialog: ProductExtraDeleteDialog;
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

    it('should load ProductExtras', async () => {
        await navBarPage.goToEntity('product-extra');
        productExtraComponentsPage = new ProductExtraComponentsPage();
        await browser.wait(ec.visibilityOf(productExtraComponentsPage.title), 5000);
        expect(await productExtraComponentsPage.getTitle()).to.eq('doraApp.productExtra.home.title');
    });

    it('should load create ProductExtra page', async () => {
        await productExtraComponentsPage.clickOnCreateButton();
        productExtraUpdatePage = new ProductExtraUpdatePage();
        expect(await productExtraUpdatePage.getPageTitle()).to.eq('doraApp.productExtra.home.createOrEditLabel');
        await productExtraUpdatePage.cancel();
    });

    it('should create and save ProductExtras', async () => {
        const nbButtonsBeforeCreate = await productExtraComponentsPage.countDeleteButtons();

        await productExtraComponentsPage.clickOnCreateButton();
        await promise.all([
            productExtraUpdatePage.setExtraNameInput('extraName'),
            productExtraUpdatePage.setDescriptionInput('description'),
            productExtraUpdatePage.setExtraValueInput('5'),
            productExtraUpdatePage.setFullPhotoInput(absolutePath),
            productExtraUpdatePage.setFullPhotoUrlInput('fullPhotoUrl'),
            productExtraUpdatePage.setThumbnailPhotoInput(absolutePath),
            productExtraUpdatePage.setThumbnailPhotoUrlInput('thumbnailPhotoUrl'),
            productExtraUpdatePage.productSelectLastOption()
        ]);
        expect(await productExtraUpdatePage.getExtraNameInput()).to.eq('extraName');
        expect(await productExtraUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await productExtraUpdatePage.getExtraValueInput()).to.eq('5');
        expect(await productExtraUpdatePage.getFullPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await productExtraUpdatePage.getFullPhotoUrlInput()).to.eq('fullPhotoUrl');
        expect(await productExtraUpdatePage.getThumbnailPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await productExtraUpdatePage.getThumbnailPhotoUrlInput()).to.eq('thumbnailPhotoUrl');
        await productExtraUpdatePage.save();
        expect(await productExtraUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productExtraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductExtra', async () => {
        const nbButtonsBeforeDelete = await productExtraComponentsPage.countDeleteButtons();
        await productExtraComponentsPage.clickOnLastDeleteButton();

        productExtraDeleteDialog = new ProductExtraDeleteDialog();
        expect(await productExtraDeleteDialog.getDialogTitle()).to.eq('doraApp.productExtra.delete.question');
        await productExtraDeleteDialog.clickOnConfirmButton();

        expect(await productExtraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
