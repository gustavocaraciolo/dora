/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShopSectionComponentsPage, ShopSectionDeleteDialog, ShopSectionUpdatePage } from './shop-section.page-object';

const expect = chai.expect;

describe('ShopSection e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let shopSectionUpdatePage: ShopSectionUpdatePage;
    let shopSectionComponentsPage: ShopSectionComponentsPage;
    let shopSectionDeleteDialog: ShopSectionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ShopSections', async () => {
        await navBarPage.goToEntity('shop-section');
        shopSectionComponentsPage = new ShopSectionComponentsPage();
        await browser.wait(ec.visibilityOf(shopSectionComponentsPage.title), 5000);
        expect(await shopSectionComponentsPage.getTitle()).to.eq('doraApp.shopSection.home.title');
    });

    it('should load create ShopSection page', async () => {
        await shopSectionComponentsPage.clickOnCreateButton();
        shopSectionUpdatePage = new ShopSectionUpdatePage();
        expect(await shopSectionUpdatePage.getPageTitle()).to.eq('doraApp.shopSection.home.createOrEditLabel');
        await shopSectionUpdatePage.cancel();
    });

    it('should create and save ShopSections', async () => {
        const nbButtonsBeforeCreate = await shopSectionComponentsPage.countDeleteButtons();

        await shopSectionComponentsPage.clickOnCreateButton();
        await promise.all([
            shopSectionUpdatePage.setSectionNameInput('sectionName'),
            shopSectionUpdatePage.setDescriptionInput('description'),
            shopSectionUpdatePage.setSurchargePercentageInput('5'),
            shopSectionUpdatePage.setSurchargeFlatAmountInput('5'),
            shopSectionUpdatePage.shopSelectLastOption()
        ]);
        expect(await shopSectionUpdatePage.getSectionNameInput()).to.eq('sectionName');
        expect(await shopSectionUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await shopSectionUpdatePage.getSurchargePercentageInput()).to.eq('5');
        expect(await shopSectionUpdatePage.getSurchargeFlatAmountInput()).to.eq('5');
        const selectedUsePercentage = shopSectionUpdatePage.getUsePercentageInput();
        if (await selectedUsePercentage.isSelected()) {
            await shopSectionUpdatePage.getUsePercentageInput().click();
            expect(await shopSectionUpdatePage.getUsePercentageInput().isSelected()).to.be.false;
        } else {
            await shopSectionUpdatePage.getUsePercentageInput().click();
            expect(await shopSectionUpdatePage.getUsePercentageInput().isSelected()).to.be.true;
        }
        await shopSectionUpdatePage.save();
        expect(await shopSectionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await shopSectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ShopSection', async () => {
        const nbButtonsBeforeDelete = await shopSectionComponentsPage.countDeleteButtons();
        await shopSectionComponentsPage.clickOnLastDeleteButton();

        shopSectionDeleteDialog = new ShopSectionDeleteDialog();
        expect(await shopSectionDeleteDialog.getDialogTitle()).to.eq('doraApp.shopSection.delete.question');
        await shopSectionDeleteDialog.clickOnConfirmButton();

        expect(await shopSectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
