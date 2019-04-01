/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    OrdersLineVariantComponentsPage,
    OrdersLineVariantDeleteDialog,
    OrdersLineVariantUpdatePage
} from './orders-line-variant.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('OrdersLineVariant e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ordersLineVariantUpdatePage: OrdersLineVariantUpdatePage;
    let ordersLineVariantComponentsPage: OrdersLineVariantComponentsPage;
    let ordersLineVariantDeleteDialog: OrdersLineVariantDeleteDialog;
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

    it('should load OrdersLineVariants', async () => {
        await navBarPage.goToEntity('orders-line-variant');
        ordersLineVariantComponentsPage = new OrdersLineVariantComponentsPage();
        await browser.wait(ec.visibilityOf(ordersLineVariantComponentsPage.title), 5000);
        expect(await ordersLineVariantComponentsPage.getTitle()).to.eq('doraApp.ordersLineVariant.home.title');
    });

    it('should load create OrdersLineVariant page', async () => {
        await ordersLineVariantComponentsPage.clickOnCreateButton();
        ordersLineVariantUpdatePage = new OrdersLineVariantUpdatePage();
        expect(await ordersLineVariantUpdatePage.getPageTitle()).to.eq('doraApp.ordersLineVariant.home.createOrEditLabel');
        await ordersLineVariantUpdatePage.cancel();
    });

    it('should create and save OrdersLineVariants', async () => {
        const nbButtonsBeforeCreate = await ordersLineVariantComponentsPage.countDeleteButtons();

        await ordersLineVariantComponentsPage.clickOnCreateButton();
        await promise.all([
            ordersLineVariantUpdatePage.setVariantNameInput('variantName'),
            ordersLineVariantUpdatePage.setVariantValueInput('variantValue'),
            ordersLineVariantUpdatePage.setDescriptionInput('description'),
            ordersLineVariantUpdatePage.setPercentageInput('5'),
            ordersLineVariantUpdatePage.setFullPhotoInput(absolutePath),
            ordersLineVariantUpdatePage.setFullPhotoUrlInput('fullPhotoUrl'),
            ordersLineVariantUpdatePage.setThumbnailPhotoInput(absolutePath),
            ordersLineVariantUpdatePage.setThumbnailPhotoUrlInput('thumbnailPhotoUrl'),
            ordersLineVariantUpdatePage.setPriceInput('5'),
            ordersLineVariantUpdatePage.ordersLineSelectLastOption()
        ]);
        expect(await ordersLineVariantUpdatePage.getVariantNameInput()).to.eq('variantName');
        expect(await ordersLineVariantUpdatePage.getVariantValueInput()).to.eq('variantValue');
        expect(await ordersLineVariantUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await ordersLineVariantUpdatePage.getPercentageInput()).to.eq('5');
        expect(await ordersLineVariantUpdatePage.getFullPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await ordersLineVariantUpdatePage.getFullPhotoUrlInput()).to.eq('fullPhotoUrl');
        expect(await ordersLineVariantUpdatePage.getThumbnailPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await ordersLineVariantUpdatePage.getThumbnailPhotoUrlInput()).to.eq('thumbnailPhotoUrl');
        expect(await ordersLineVariantUpdatePage.getPriceInput()).to.eq('5');
        await ordersLineVariantUpdatePage.save();
        expect(await ordersLineVariantUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ordersLineVariantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrdersLineVariant', async () => {
        const nbButtonsBeforeDelete = await ordersLineVariantComponentsPage.countDeleteButtons();
        await ordersLineVariantComponentsPage.clickOnLastDeleteButton();

        ordersLineVariantDeleteDialog = new OrdersLineVariantDeleteDialog();
        expect(await ordersLineVariantDeleteDialog.getDialogTitle()).to.eq('doraApp.ordersLineVariant.delete.question');
        await ordersLineVariantDeleteDialog.clickOnConfirmButton();

        expect(await ordersLineVariantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
