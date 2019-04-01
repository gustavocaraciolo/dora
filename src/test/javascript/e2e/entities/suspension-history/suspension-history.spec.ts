/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    SuspensionHistoryComponentsPage,
    SuspensionHistoryDeleteDialog,
    SuspensionHistoryUpdatePage
} from './suspension-history.page-object';

const expect = chai.expect;

describe('SuspensionHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let suspensionHistoryUpdatePage: SuspensionHistoryUpdatePage;
    let suspensionHistoryComponentsPage: SuspensionHistoryComponentsPage;
    let suspensionHistoryDeleteDialog: SuspensionHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SuspensionHistories', async () => {
        await navBarPage.goToEntity('suspension-history');
        suspensionHistoryComponentsPage = new SuspensionHistoryComponentsPage();
        await browser.wait(ec.visibilityOf(suspensionHistoryComponentsPage.title), 5000);
        expect(await suspensionHistoryComponentsPage.getTitle()).to.eq('doraApp.suspensionHistory.home.title');
    });

    it('should load create SuspensionHistory page', async () => {
        await suspensionHistoryComponentsPage.clickOnCreateButton();
        suspensionHistoryUpdatePage = new SuspensionHistoryUpdatePage();
        expect(await suspensionHistoryUpdatePage.getPageTitle()).to.eq('doraApp.suspensionHistory.home.createOrEditLabel');
        await suspensionHistoryUpdatePage.cancel();
    });

    it('should create and save SuspensionHistories', async () => {
        const nbButtonsBeforeCreate = await suspensionHistoryComponentsPage.countDeleteButtons();

        await suspensionHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            suspensionHistoryUpdatePage.setSuspendedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            suspensionHistoryUpdatePage.suspensionTypeSelectLastOption(),
            suspensionHistoryUpdatePage.setSuspendedReasonInput('suspendedReason'),
            suspensionHistoryUpdatePage.setResolutionNoteInput('resolutionNote'),
            suspensionHistoryUpdatePage.setUnsuspensionDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            suspensionHistoryUpdatePage.profileSelectLastOption(),
            suspensionHistoryUpdatePage.suspendedBySelectLastOption()
        ]);
        expect(await suspensionHistoryUpdatePage.getSuspendedDateInput()).to.contain('2001-01-01T02:30');
        expect(await suspensionHistoryUpdatePage.getSuspendedReasonInput()).to.eq('suspendedReason');
        expect(await suspensionHistoryUpdatePage.getResolutionNoteInput()).to.eq('resolutionNote');
        expect(await suspensionHistoryUpdatePage.getUnsuspensionDateInput()).to.contain('2001-01-01T02:30');
        await suspensionHistoryUpdatePage.save();
        expect(await suspensionHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await suspensionHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SuspensionHistory', async () => {
        const nbButtonsBeforeDelete = await suspensionHistoryComponentsPage.countDeleteButtons();
        await suspensionHistoryComponentsPage.clickOnLastDeleteButton();

        suspensionHistoryDeleteDialog = new SuspensionHistoryDeleteDialog();
        expect(await suspensionHistoryDeleteDialog.getDialogTitle()).to.eq('doraApp.suspensionHistory.delete.question');
        await suspensionHistoryDeleteDialog.clickOnConfirmButton();

        expect(await suspensionHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
