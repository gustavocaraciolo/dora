/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrdersLineComponentsPage, OrdersLineDeleteDialog, OrdersLineUpdatePage } from './orders-line.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('OrdersLine e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ordersLineUpdatePage: OrdersLineUpdatePage;
    let ordersLineComponentsPage: OrdersLineComponentsPage;
    let ordersLineDeleteDialog: OrdersLineDeleteDialog;
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

    it('should load OrdersLines', async () => {
        await navBarPage.goToEntity('orders-line');
        ordersLineComponentsPage = new OrdersLineComponentsPage();
        await browser.wait(ec.visibilityOf(ordersLineComponentsPage.title), 5000);
        expect(await ordersLineComponentsPage.getTitle()).to.eq('doraApp.ordersLine.home.title');
    });

    it('should load create OrdersLine page', async () => {
        await ordersLineComponentsPage.clickOnCreateButton();
        ordersLineUpdatePage = new OrdersLineUpdatePage();
        expect(await ordersLineUpdatePage.getPageTitle()).to.eq('doraApp.ordersLine.home.createOrEditLabel');
        await ordersLineUpdatePage.cancel();
    });

    it('should create and save OrdersLines', async () => {
        const nbButtonsBeforeCreate = await ordersLineComponentsPage.countDeleteButtons();

        await ordersLineComponentsPage.clickOnCreateButton();
        await promise.all([
            ordersLineUpdatePage.setOrdersLineNameInput('ordersLineName'),
            ordersLineUpdatePage.setOrdersLineValueInput('ordersLineValue'),
            ordersLineUpdatePage.setOrdersLinePriceInput('5'),
            ordersLineUpdatePage.setOrdersLineDescriptionInput('ordersLineDescription'),
            ordersLineUpdatePage.setThumbnailPhotoInput(absolutePath),
            ordersLineUpdatePage.setFullPhotoInput(absolutePath),
            ordersLineUpdatePage.setFullPhotoUrlInput('fullPhotoUrl'),
            ordersLineUpdatePage.setThumbnailPhotoUrlInput('thumbnailPhotoUrl'),
            ordersLineUpdatePage.ordersSelectLastOption(),
            ordersLineUpdatePage.productSelectLastOption()
        ]);
        expect(await ordersLineUpdatePage.getOrdersLineNameInput()).to.eq('ordersLineName');
        expect(await ordersLineUpdatePage.getOrdersLineValueInput()).to.eq('ordersLineValue');
        expect(await ordersLineUpdatePage.getOrdersLinePriceInput()).to.eq('5');
        expect(await ordersLineUpdatePage.getOrdersLineDescriptionInput()).to.eq('ordersLineDescription');
        expect(await ordersLineUpdatePage.getThumbnailPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await ordersLineUpdatePage.getFullPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await ordersLineUpdatePage.getFullPhotoUrlInput()).to.eq('fullPhotoUrl');
        expect(await ordersLineUpdatePage.getThumbnailPhotoUrlInput()).to.eq('thumbnailPhotoUrl');
        await ordersLineUpdatePage.save();
        expect(await ordersLineUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ordersLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrdersLine', async () => {
        const nbButtonsBeforeDelete = await ordersLineComponentsPage.countDeleteButtons();
        await ordersLineComponentsPage.clickOnLastDeleteButton();

        ordersLineDeleteDialog = new OrdersLineDeleteDialog();
        expect(await ordersLineDeleteDialog.getDialogTitle()).to.eq('doraApp.ordersLine.delete.question');
        await ordersLineDeleteDialog.clickOnConfirmButton();

        expect(await ordersLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
