/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrdersLineExtraComponentsPage, OrdersLineExtraDeleteDialog, OrdersLineExtraUpdatePage } from './orders-line-extra.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('OrdersLineExtra e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ordersLineExtraUpdatePage: OrdersLineExtraUpdatePage;
    let ordersLineExtraComponentsPage: OrdersLineExtraComponentsPage;
    let ordersLineExtraDeleteDialog: OrdersLineExtraDeleteDialog;
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

    it('should load OrdersLineExtras', async () => {
        await navBarPage.goToEntity('orders-line-extra');
        ordersLineExtraComponentsPage = new OrdersLineExtraComponentsPage();
        await browser.wait(ec.visibilityOf(ordersLineExtraComponentsPage.title), 5000);
        expect(await ordersLineExtraComponentsPage.getTitle()).to.eq('doraApp.ordersLineExtra.home.title');
    });

    it('should load create OrdersLineExtra page', async () => {
        await ordersLineExtraComponentsPage.clickOnCreateButton();
        ordersLineExtraUpdatePage = new OrdersLineExtraUpdatePage();
        expect(await ordersLineExtraUpdatePage.getPageTitle()).to.eq('doraApp.ordersLineExtra.home.createOrEditLabel');
        await ordersLineExtraUpdatePage.cancel();
    });

    it('should create and save OrdersLineExtras', async () => {
        const nbButtonsBeforeCreate = await ordersLineExtraComponentsPage.countDeleteButtons();

        await ordersLineExtraComponentsPage.clickOnCreateButton();
        await promise.all([
            ordersLineExtraUpdatePage.setOrdersLineExtraNameInput('ordersLineExtraName'),
            ordersLineExtraUpdatePage.setOrdersLineExtraValueInput('ordersLineExtraValue'),
            ordersLineExtraUpdatePage.setOrdersLineExtraPriceInput('5'),
            ordersLineExtraUpdatePage.setOrdersOptionDescriptionInput('ordersOptionDescription'),
            ordersLineExtraUpdatePage.setFullPhotoInput(absolutePath),
            ordersLineExtraUpdatePage.setFullPhotoUrlInput('fullPhotoUrl'),
            ordersLineExtraUpdatePage.setThumbnailPhotoInput(absolutePath),
            ordersLineExtraUpdatePage.setThumbnailPhotoUrlInput('thumbnailPhotoUrl'),
            ordersLineExtraUpdatePage.ordersLineVariantSelectLastOption()
        ]);
        expect(await ordersLineExtraUpdatePage.getOrdersLineExtraNameInput()).to.eq('ordersLineExtraName');
        expect(await ordersLineExtraUpdatePage.getOrdersLineExtraValueInput()).to.eq('ordersLineExtraValue');
        expect(await ordersLineExtraUpdatePage.getOrdersLineExtraPriceInput()).to.eq('5');
        expect(await ordersLineExtraUpdatePage.getOrdersOptionDescriptionInput()).to.eq('ordersOptionDescription');
        expect(await ordersLineExtraUpdatePage.getFullPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await ordersLineExtraUpdatePage.getFullPhotoUrlInput()).to.eq('fullPhotoUrl');
        expect(await ordersLineExtraUpdatePage.getThumbnailPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await ordersLineExtraUpdatePage.getThumbnailPhotoUrlInput()).to.eq('thumbnailPhotoUrl');
        await ordersLineExtraUpdatePage.save();
        expect(await ordersLineExtraUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ordersLineExtraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrdersLineExtra', async () => {
        const nbButtonsBeforeDelete = await ordersLineExtraComponentsPage.countDeleteButtons();
        await ordersLineExtraComponentsPage.clickOnLastDeleteButton();

        ordersLineExtraDeleteDialog = new OrdersLineExtraDeleteDialog();
        expect(await ordersLineExtraDeleteDialog.getDialogTitle()).to.eq('doraApp.ordersLineExtra.delete.question');
        await ordersLineExtraDeleteDialog.clickOnConfirmButton();

        expect(await ordersLineExtraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
