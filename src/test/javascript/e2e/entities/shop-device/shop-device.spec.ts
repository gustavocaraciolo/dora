/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShopDeviceComponentsPage, ShopDeviceDeleteDialog, ShopDeviceUpdatePage } from './shop-device.page-object';

const expect = chai.expect;

describe('ShopDevice e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let shopDeviceUpdatePage: ShopDeviceUpdatePage;
    let shopDeviceComponentsPage: ShopDeviceComponentsPage;
    let shopDeviceDeleteDialog: ShopDeviceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ShopDevices', async () => {
        await navBarPage.goToEntity('shop-device');
        shopDeviceComponentsPage = new ShopDeviceComponentsPage();
        await browser.wait(ec.visibilityOf(shopDeviceComponentsPage.title), 5000);
        expect(await shopDeviceComponentsPage.getTitle()).to.eq('doraApp.shopDevice.home.title');
    });

    it('should load create ShopDevice page', async () => {
        await shopDeviceComponentsPage.clickOnCreateButton();
        shopDeviceUpdatePage = new ShopDeviceUpdatePage();
        expect(await shopDeviceUpdatePage.getPageTitle()).to.eq('doraApp.shopDevice.home.createOrEditLabel');
        await shopDeviceUpdatePage.cancel();
    });

    it('should create and save ShopDevices', async () => {
        const nbButtonsBeforeCreate = await shopDeviceComponentsPage.countDeleteButtons();

        await shopDeviceComponentsPage.clickOnCreateButton();
        await promise.all([
            shopDeviceUpdatePage.setDeviceNameInput('deviceName'),
            shopDeviceUpdatePage.setDeviceModelInput('deviceModel'),
            shopDeviceUpdatePage.setRegisteredDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shopDeviceUpdatePage.shopSelectLastOption()
        ]);
        expect(await shopDeviceUpdatePage.getDeviceNameInput()).to.eq('deviceName');
        expect(await shopDeviceUpdatePage.getDeviceModelInput()).to.eq('deviceModel');
        expect(await shopDeviceUpdatePage.getRegisteredDateInput()).to.contain('2001-01-01T02:30');
        await shopDeviceUpdatePage.save();
        expect(await shopDeviceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await shopDeviceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ShopDevice', async () => {
        const nbButtonsBeforeDelete = await shopDeviceComponentsPage.countDeleteButtons();
        await shopDeviceComponentsPage.clickOnLastDeleteButton();

        shopDeviceDeleteDialog = new ShopDeviceDeleteDialog();
        expect(await shopDeviceDeleteDialog.getDialogTitle()).to.eq('doraApp.shopDevice.delete.question');
        await shopDeviceDeleteDialog.clickOnConfirmButton();

        expect(await shopDeviceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
