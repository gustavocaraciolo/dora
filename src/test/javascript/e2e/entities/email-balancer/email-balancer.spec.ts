/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmailBalancerComponentsPage, EmailBalancerDeleteDialog, EmailBalancerUpdatePage } from './email-balancer.page-object';

const expect = chai.expect;

describe('EmailBalancer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let emailBalancerUpdatePage: EmailBalancerUpdatePage;
    let emailBalancerComponentsPage: EmailBalancerComponentsPage;
    let emailBalancerDeleteDialog: EmailBalancerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EmailBalancers', async () => {
        await navBarPage.goToEntity('email-balancer');
        emailBalancerComponentsPage = new EmailBalancerComponentsPage();
        await browser.wait(ec.visibilityOf(emailBalancerComponentsPage.title), 5000);
        expect(await emailBalancerComponentsPage.getTitle()).to.eq('doraApp.emailBalancer.home.title');
    });

    it('should load create EmailBalancer page', async () => {
        await emailBalancerComponentsPage.clickOnCreateButton();
        emailBalancerUpdatePage = new EmailBalancerUpdatePage();
        expect(await emailBalancerUpdatePage.getPageTitle()).to.eq('doraApp.emailBalancer.home.createOrEditLabel');
        await emailBalancerUpdatePage.cancel();
    });

    it('should create and save EmailBalancers', async () => {
        const nbButtonsBeforeCreate = await emailBalancerComponentsPage.countDeleteButtons();

        await emailBalancerComponentsPage.clickOnCreateButton();
        await promise.all([
            emailBalancerUpdatePage.setRelayIdInput('relayId'),
            emailBalancerUpdatePage.setRelayPasswordInput('relayPassword'),
            emailBalancerUpdatePage.setStartingCountInput('5'),
            emailBalancerUpdatePage.setEndingCountInput('5'),
            emailBalancerUpdatePage.setProviderInput('provider'),
            emailBalancerUpdatePage.setRelayPortInput('5')
        ]);
        expect(await emailBalancerUpdatePage.getRelayIdInput()).to.eq('relayId');
        expect(await emailBalancerUpdatePage.getRelayPasswordInput()).to.eq('relayPassword');
        expect(await emailBalancerUpdatePage.getStartingCountInput()).to.eq('5');
        expect(await emailBalancerUpdatePage.getEndingCountInput()).to.eq('5');
        expect(await emailBalancerUpdatePage.getProviderInput()).to.eq('provider');
        expect(await emailBalancerUpdatePage.getRelayPortInput()).to.eq('5');
        const selectedEnabled = emailBalancerUpdatePage.getEnabledInput();
        if (await selectedEnabled.isSelected()) {
            await emailBalancerUpdatePage.getEnabledInput().click();
            expect(await emailBalancerUpdatePage.getEnabledInput().isSelected()).to.be.false;
        } else {
            await emailBalancerUpdatePage.getEnabledInput().click();
            expect(await emailBalancerUpdatePage.getEnabledInput().isSelected()).to.be.true;
        }
        await emailBalancerUpdatePage.save();
        expect(await emailBalancerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await emailBalancerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EmailBalancer', async () => {
        const nbButtonsBeforeDelete = await emailBalancerComponentsPage.countDeleteButtons();
        await emailBalancerComponentsPage.clickOnLastDeleteButton();

        emailBalancerDeleteDialog = new EmailBalancerDeleteDialog();
        expect(await emailBalancerDeleteDialog.getDialogTitle()).to.eq('doraApp.emailBalancer.delete.question');
        await emailBalancerDeleteDialog.clickOnConfirmButton();

        expect(await emailBalancerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
