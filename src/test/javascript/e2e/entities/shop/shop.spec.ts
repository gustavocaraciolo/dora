/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShopComponentsPage, ShopDeleteDialog, ShopUpdatePage } from './shop.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Shop e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let shopUpdatePage: ShopUpdatePage;
    let shopComponentsPage: ShopComponentsPage;
    let shopDeleteDialog: ShopDeleteDialog;
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

    it('should load Shops', async () => {
        await navBarPage.goToEntity('shop');
        shopComponentsPage = new ShopComponentsPage();
        await browser.wait(ec.visibilityOf(shopComponentsPage.title), 5000);
        expect(await shopComponentsPage.getTitle()).to.eq('doraApp.shop.home.title');
    });

    it('should load create Shop page', async () => {
        await shopComponentsPage.clickOnCreateButton();
        shopUpdatePage = new ShopUpdatePage();
        expect(await shopUpdatePage.getPageTitle()).to.eq('doraApp.shop.home.createOrEditLabel');
        await shopUpdatePage.cancel();
    });

    it('should create and save Shops', async () => {
        const nbButtonsBeforeCreate = await shopComponentsPage.countDeleteButtons();

        await shopComponentsPage.clickOnCreateButton();
        await promise.all([
            shopUpdatePage.setShopNameInput('shopName'),
            shopUpdatePage.shopAccountTypeSelectLastOption(),
            shopUpdatePage.setApprovalDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shopUpdatePage.setAddressInput('address'),
            shopUpdatePage.setEmailInput('email'),
            shopUpdatePage.setDescriptionInput('description'),
            shopUpdatePage.setNoteInput('note'),
            shopUpdatePage.setLandlandInput('landland'),
            shopUpdatePage.setMobileInput('mobile'),
            shopUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shopUpdatePage.setShopLogoInput(absolutePath),
            shopUpdatePage.setShopLogoUrlInput('shopLogoUrl'),
            shopUpdatePage.setCurrencyInput('currency'),
            shopUpdatePage.companySelectLastOption(),
            shopUpdatePage.approvedBySelectLastOption()
        ]);
        expect(await shopUpdatePage.getShopNameInput()).to.eq('shopName');
        expect(await shopUpdatePage.getApprovalDateInput()).to.contain('2001-01-01T02:30');
        expect(await shopUpdatePage.getAddressInput()).to.eq('address');
        expect(await shopUpdatePage.getEmailInput()).to.eq('email');
        expect(await shopUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await shopUpdatePage.getNoteInput()).to.eq('note');
        expect(await shopUpdatePage.getLandlandInput()).to.eq('landland');
        expect(await shopUpdatePage.getMobileInput()).to.eq('mobile');
        expect(await shopUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await shopUpdatePage.getShopLogoInput()).to.endsWith(fileNameToUpload);
        expect(await shopUpdatePage.getShopLogoUrlInput()).to.eq('shopLogoUrl');
        const selectedActive = shopUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await shopUpdatePage.getActiveInput().click();
            expect(await shopUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await shopUpdatePage.getActiveInput().click();
            expect(await shopUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        expect(await shopUpdatePage.getCurrencyInput()).to.eq('currency');
        await shopUpdatePage.save();
        expect(await shopUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await shopComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Shop', async () => {
        const nbButtonsBeforeDelete = await shopComponentsPage.countDeleteButtons();
        await shopComponentsPage.clickOnLastDeleteButton();

        shopDeleteDialog = new ShopDeleteDialog();
        expect(await shopDeleteDialog.getDialogTitle()).to.eq('doraApp.shop.delete.question');
        await shopDeleteDialog.clickOnConfirmButton();

        expect(await shopComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
