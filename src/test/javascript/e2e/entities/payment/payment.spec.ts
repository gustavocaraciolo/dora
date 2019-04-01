/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PaymentComponentsPage, PaymentDeleteDialog, PaymentUpdatePage } from './payment.page-object';

const expect = chai.expect;

describe('Payment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let paymentUpdatePage: PaymentUpdatePage;
    let paymentComponentsPage: PaymentComponentsPage;
    let paymentDeleteDialog: PaymentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Payments', async () => {
        await navBarPage.goToEntity('payment');
        paymentComponentsPage = new PaymentComponentsPage();
        await browser.wait(ec.visibilityOf(paymentComponentsPage.title), 5000);
        expect(await paymentComponentsPage.getTitle()).to.eq('doraApp.payment.home.title');
    });

    it('should load create Payment page', async () => {
        await paymentComponentsPage.clickOnCreateButton();
        paymentUpdatePage = new PaymentUpdatePage();
        expect(await paymentUpdatePage.getPageTitle()).to.eq('doraApp.payment.home.createOrEditLabel');
        await paymentUpdatePage.cancel();
    });

    it('should create and save Payments', async () => {
        const nbButtonsBeforeCreate = await paymentComponentsPage.countDeleteButtons();

        await paymentComponentsPage.clickOnCreateButton();
        await promise.all([
            paymentUpdatePage.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            paymentUpdatePage.setPaymentProviderInput('paymentProvider'),
            paymentUpdatePage.setAmountInput('5'),
            paymentUpdatePage.paymentStatusSelectLastOption(),
            paymentUpdatePage.setCurencyInput('curency'),
            paymentUpdatePage.setCustomerNameInput('customerName'),
            paymentUpdatePage.shopSelectLastOption(),
            paymentUpdatePage.processedBySelectLastOption(),
            paymentUpdatePage.paymentMethodSelectLastOption(),
            paymentUpdatePage.orderSelectLastOption()
        ]);
        expect(await paymentUpdatePage.getPaymentDateInput()).to.contain('2001-01-01T02:30');
        expect(await paymentUpdatePage.getPaymentProviderInput()).to.eq('paymentProvider');
        expect(await paymentUpdatePage.getAmountInput()).to.eq('5');
        expect(await paymentUpdatePage.getCurencyInput()).to.eq('curency');
        expect(await paymentUpdatePage.getCustomerNameInput()).to.eq('customerName');
        await paymentUpdatePage.save();
        expect(await paymentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await paymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Payment', async () => {
        const nbButtonsBeforeDelete = await paymentComponentsPage.countDeleteButtons();
        await paymentComponentsPage.clickOnLastDeleteButton();

        paymentDeleteDialog = new PaymentDeleteDialog();
        expect(await paymentDeleteDialog.getDialogTitle()).to.eq('doraApp.payment.delete.question');
        await paymentDeleteDialog.clickOnConfirmButton();

        expect(await paymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
