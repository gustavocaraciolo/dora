/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DiscountComponentsPage, DiscountDeleteDialog, DiscountUpdatePage } from './discount.page-object';

const expect = chai.expect;

describe('Discount e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let discountUpdatePage: DiscountUpdatePage;
    let discountComponentsPage: DiscountComponentsPage;
    let discountDeleteDialog: DiscountDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Discounts', async () => {
        await navBarPage.goToEntity('discount');
        discountComponentsPage = new DiscountComponentsPage();
        await browser.wait(ec.visibilityOf(discountComponentsPage.title), 5000);
        expect(await discountComponentsPage.getTitle()).to.eq('doraApp.discount.home.title');
    });

    it('should load create Discount page', async () => {
        await discountComponentsPage.clickOnCreateButton();
        discountUpdatePage = new DiscountUpdatePage();
        expect(await discountUpdatePage.getPageTitle()).to.eq('doraApp.discount.home.createOrEditLabel');
        await discountUpdatePage.cancel();
    });

    it('should create and save Discounts', async () => {
        const nbButtonsBeforeCreate = await discountComponentsPage.countDeleteButtons();

        await discountComponentsPage.clickOnCreateButton();
        await promise.all([
            discountUpdatePage.setDescriptionInput('description'),
            discountUpdatePage.setPercentageInput('5'),
            discountUpdatePage.setAmountInput('5'),
            discountUpdatePage.shopSelectLastOption()
        ]);
        expect(await discountUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await discountUpdatePage.getPercentageInput()).to.eq('5');
        expect(await discountUpdatePage.getAmountInput()).to.eq('5');
        const selectedActive = discountUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await discountUpdatePage.getActiveInput().click();
            expect(await discountUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await discountUpdatePage.getActiveInput().click();
            expect(await discountUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        await discountUpdatePage.save();
        expect(await discountUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Discount', async () => {
        const nbButtonsBeforeDelete = await discountComponentsPage.countDeleteButtons();
        await discountComponentsPage.clickOnLastDeleteButton();

        discountDeleteDialog = new DiscountDeleteDialog();
        expect(await discountDeleteDialog.getDialogTitle()).to.eq('doraApp.discount.delete.question');
        await discountDeleteDialog.clickOnConfirmButton();

        expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
