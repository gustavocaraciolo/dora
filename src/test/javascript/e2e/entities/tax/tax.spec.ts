/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaxComponentsPage, TaxDeleteDialog, TaxUpdatePage } from './tax.page-object';

const expect = chai.expect;

describe('Tax e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let taxUpdatePage: TaxUpdatePage;
    let taxComponentsPage: TaxComponentsPage;
    let taxDeleteDialog: TaxDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Taxes', async () => {
        await navBarPage.goToEntity('tax');
        taxComponentsPage = new TaxComponentsPage();
        await browser.wait(ec.visibilityOf(taxComponentsPage.title), 5000);
        expect(await taxComponentsPage.getTitle()).to.eq('doraApp.tax.home.title');
    });

    it('should load create Tax page', async () => {
        await taxComponentsPage.clickOnCreateButton();
        taxUpdatePage = new TaxUpdatePage();
        expect(await taxUpdatePage.getPageTitle()).to.eq('doraApp.tax.home.createOrEditLabel');
        await taxUpdatePage.cancel();
    });

    it('should create and save Taxes', async () => {
        const nbButtonsBeforeCreate = await taxComponentsPage.countDeleteButtons();

        await taxComponentsPage.clickOnCreateButton();
        await promise.all([
            taxUpdatePage.setDescriptionInput('description'),
            taxUpdatePage.setPercentageInput('5'),
            taxUpdatePage.setAmountInput('5'),
            taxUpdatePage.shopSelectLastOption()
        ]);
        expect(await taxUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await taxUpdatePage.getPercentageInput()).to.eq('5');
        expect(await taxUpdatePage.getAmountInput()).to.eq('5');
        const selectedActive = taxUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await taxUpdatePage.getActiveInput().click();
            expect(await taxUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await taxUpdatePage.getActiveInput().click();
            expect(await taxUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        await taxUpdatePage.save();
        expect(await taxUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await taxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Tax', async () => {
        const nbButtonsBeforeDelete = await taxComponentsPage.countDeleteButtons();
        await taxComponentsPage.clickOnLastDeleteButton();

        taxDeleteDialog = new TaxDeleteDialog();
        expect(await taxDeleteDialog.getDialogTitle()).to.eq('doraApp.tax.delete.question');
        await taxDeleteDialog.clickOnConfirmButton();

        expect(await taxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
