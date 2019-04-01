/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShopChangeComponentsPage, ShopChangeDeleteDialog, ShopChangeUpdatePage } from './shop-change.page-object';

const expect = chai.expect;

describe('ShopChange e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let shopChangeUpdatePage: ShopChangeUpdatePage;
    let shopChangeComponentsPage: ShopChangeComponentsPage;
    let shopChangeDeleteDialog: ShopChangeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ShopChanges', async () => {
        await navBarPage.goToEntity('shop-change');
        shopChangeComponentsPage = new ShopChangeComponentsPage();
        await browser.wait(ec.visibilityOf(shopChangeComponentsPage.title), 5000);
        expect(await shopChangeComponentsPage.getTitle()).to.eq('doraApp.shopChange.home.title');
    });

    it('should load create ShopChange page', async () => {
        await shopChangeComponentsPage.clickOnCreateButton();
        shopChangeUpdatePage = new ShopChangeUpdatePage();
        expect(await shopChangeUpdatePage.getPageTitle()).to.eq('doraApp.shopChange.home.createOrEditLabel');
        await shopChangeUpdatePage.cancel();
    });

    it('should create and save ShopChanges', async () => {
        const nbButtonsBeforeCreate = await shopChangeComponentsPage.countDeleteButtons();

        await shopChangeComponentsPage.clickOnCreateButton();
        await promise.all([
            shopChangeUpdatePage.setChangeInput('change'),
            shopChangeUpdatePage.setChangedEntityInput('changedEntity'),
            shopChangeUpdatePage.setNoteInput('note'),
            shopChangeUpdatePage.setChangeDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shopChangeUpdatePage.shopSelectLastOption(),
            shopChangeUpdatePage.changedBySelectLastOption()
        ]);
        expect(await shopChangeUpdatePage.getChangeInput()).to.eq('change');
        expect(await shopChangeUpdatePage.getChangedEntityInput()).to.eq('changedEntity');
        expect(await shopChangeUpdatePage.getNoteInput()).to.eq('note');
        expect(await shopChangeUpdatePage.getChangeDateInput()).to.contain('2001-01-01T02:30');
        await shopChangeUpdatePage.save();
        expect(await shopChangeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await shopChangeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ShopChange', async () => {
        const nbButtonsBeforeDelete = await shopChangeComponentsPage.countDeleteButtons();
        await shopChangeComponentsPage.clickOnLastDeleteButton();

        shopChangeDeleteDialog = new ShopChangeDeleteDialog();
        expect(await shopChangeDeleteDialog.getDialogTitle()).to.eq('doraApp.shopChange.delete.question');
        await shopChangeDeleteDialog.clickOnConfirmButton();

        expect(await shopChangeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
