/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    PaymentMethodConfigComponentsPage,
    PaymentMethodConfigDeleteDialog,
    PaymentMethodConfigUpdatePage
} from './payment-method-config.page-object';

const expect = chai.expect;

describe('PaymentMethodConfig e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let paymentMethodConfigUpdatePage: PaymentMethodConfigUpdatePage;
    let paymentMethodConfigComponentsPage: PaymentMethodConfigComponentsPage;
    let paymentMethodConfigDeleteDialog: PaymentMethodConfigDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PaymentMethodConfigs', async () => {
        await navBarPage.goToEntity('payment-method-config');
        paymentMethodConfigComponentsPage = new PaymentMethodConfigComponentsPage();
        await browser.wait(ec.visibilityOf(paymentMethodConfigComponentsPage.title), 5000);
        expect(await paymentMethodConfigComponentsPage.getTitle()).to.eq('doraApp.paymentMethodConfig.home.title');
    });

    it('should load create PaymentMethodConfig page', async () => {
        await paymentMethodConfigComponentsPage.clickOnCreateButton();
        paymentMethodConfigUpdatePage = new PaymentMethodConfigUpdatePage();
        expect(await paymentMethodConfigUpdatePage.getPageTitle()).to.eq('doraApp.paymentMethodConfig.home.createOrEditLabel');
        await paymentMethodConfigUpdatePage.cancel();
    });

    it('should create and save PaymentMethodConfigs', async () => {
        const nbButtonsBeforeCreate = await paymentMethodConfigComponentsPage.countDeleteButtons();

        await paymentMethodConfigComponentsPage.clickOnCreateButton();
        await promise.all([
            paymentMethodConfigUpdatePage.setKeyInput('key'),
            paymentMethodConfigUpdatePage.setValueInput('value'),
            paymentMethodConfigUpdatePage.setNoteInput('note'),
            paymentMethodConfigUpdatePage.paymentMethodSelectLastOption()
        ]);
        expect(await paymentMethodConfigUpdatePage.getKeyInput()).to.eq('key');
        expect(await paymentMethodConfigUpdatePage.getValueInput()).to.eq('value');
        expect(await paymentMethodConfigUpdatePage.getNoteInput()).to.eq('note');
        const selectedEnabled = paymentMethodConfigUpdatePage.getEnabledInput();
        if (await selectedEnabled.isSelected()) {
            await paymentMethodConfigUpdatePage.getEnabledInput().click();
            expect(await paymentMethodConfigUpdatePage.getEnabledInput().isSelected()).to.be.false;
        } else {
            await paymentMethodConfigUpdatePage.getEnabledInput().click();
            expect(await paymentMethodConfigUpdatePage.getEnabledInput().isSelected()).to.be.true;
        }
        await paymentMethodConfigUpdatePage.save();
        expect(await paymentMethodConfigUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await paymentMethodConfigComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PaymentMethodConfig', async () => {
        const nbButtonsBeforeDelete = await paymentMethodConfigComponentsPage.countDeleteButtons();
        await paymentMethodConfigComponentsPage.clickOnLastDeleteButton();

        paymentMethodConfigDeleteDialog = new PaymentMethodConfigDeleteDialog();
        expect(await paymentMethodConfigDeleteDialog.getDialogTitle()).to.eq('doraApp.paymentMethodConfig.delete.question');
        await paymentMethodConfigDeleteDialog.clickOnConfirmButton();

        expect(await paymentMethodConfigComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
